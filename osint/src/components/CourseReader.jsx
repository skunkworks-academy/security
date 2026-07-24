import React, {useEffect, useMemo, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import courseManifest from '../data/courseManifest';

const STORAGE_KEY = 'skunkworks-osint-progress-v1';

function readProgress() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function Quiz({questions = [], passMark = 80, storageId, onPassed}) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const submit = () => {
    const correct = questions.reduce(
      (total, question, index) =>
        total + (Number(answers[index]) === question.answer ? 1 : 0),
      0,
    );
    const score = Math.round((correct / questions.length) * 100);
    const next = {score, passed: score >= passMark};
    setResult(next);
    if (next.passed) onPassed?.(score);
  };

  return (
    <section className="quiz-card">
      <div className="section-kicker">Knowledge check</div>
      <h2>Module assessment</h2>
      <p>Required pass mark: {passMark}%.</p>
      {questions.map((question, questionIndex) => (
        <fieldset className="question" key={`${storageId}-${questionIndex}`}>
          <legend>
            {questionIndex + 1}. {question.question}
          </legend>
          {question.options.map((option, optionIndex) => (
            <label key={option} className="answer-option">
              <input
                type="radio"
                name={`${storageId}-${questionIndex}`}
                value={optionIndex}
                checked={Number(answers[questionIndex]) === optionIndex}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [questionIndex]: Number(event.target.value),
                  }))
                }
              />
              <span>{option}</span>
            </label>
          ))}
          {result && (
            <p
              className={
                Number(answers[questionIndex]) === question.answer
                  ? 'answer-feedback correct'
                  : 'answer-feedback incorrect'
              }>
              {question.explanation ||
                (Number(answers[questionIndex]) === question.answer
                  ? 'Correct.'
                  : 'Review this topic and try again.')}
            </p>
          )}
        </fieldset>
      ))}
      <button
        type="button"
        className="button button--primary"
        disabled={Object.keys(answers).length !== questions.length}
        onClick={submit}>
        Grade assessment
      </button>
      {result && (
        <div className={`score-panel ${result.passed ? 'passed' : 'not-passed'}`}>
          <strong>{result.score}%</strong>
          <span>
            {result.passed
              ? 'Passed. This module is marked complete.'
              : 'Not yet passed. Review the lesson and retry.'}
          </span>
        </div>
      )}
    </section>
  );
}

function Activity({activity}) {
  if (!activity) return null;
  return (
    <section className="activity-card">
      <div className="section-kicker">Applied task</div>
      <h2>{activity.title}</h2>
      <ol>
        {activity.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
      <p>
        <strong>Deliverable:</strong> {activity.deliverable}
      </p>
    </section>
  );
}

function CourseNavigation({activeSlug, progress}) {
  return (
    <aside className="course-nav">
      <div className="course-nav__header">
        <span>OSINT-101</span>
        <strong>Course map</strong>
      </div>
      <nav aria-label="Course modules">
        {courseManifest.modules.map((module) => {
          const complete = Boolean(progress[module.slug]?.passed);
          return (
            <a
              key={module.slug}
              href={`/learn/?lesson=${module.slug}`}
              className={`course-nav__item ${
                activeSlug === module.slug ? 'active' : ''
              }`}>
              <span className="module-number">
                {String(module.number).padStart(2, '0')}
              </span>
              <span>{module.title}</span>
              <span className={complete ? 'completion done' : 'completion'}>
                {complete ? '✓' : '○'}
              </span>
            </a>
          );
        })}
        <a
          href="/learn/?lesson=final-assessment"
          className={`course-nav__item ${
            activeSlug === 'final-assessment' ? 'active' : ''
          }`}>
          <span className="module-number">FA</span>
          <span>Final assessment</span>
          <span
            className={
              progress['final-assessment']?.passed
                ? 'completion done'
                : 'completion'
            }>
            {progress['final-assessment']?.passed ? '✓' : '○'}
          </span>
        </a>
      </nav>
    </aside>
  );
}

function Dashboard({progress}) {
  const completeCount = courseManifest.modules.filter(
    (module) => progress[module.slug]?.passed,
  ).length;
  const total = courseManifest.modules.length + 1;
  const percent = Math.round(
    ((completeCount + (progress['final-assessment']?.passed ? 1 : 0)) / total) *
      100,
  );

  return (
    <div className="dashboard-content">
      <div className="section-kicker">Learning dashboard</div>
      <h1>{courseManifest.title}</h1>
      <p className="lead">{courseManifest.subtitle}</p>
      <div className="progress-card">
        <div>
          <span>Overall progress</span>
          <strong>{percent}%</strong>
        </div>
        <div className="progress-track" aria-label={`${percent}% complete`}>
          <span style={{width: `${percent}%`}} />
        </div>
        <p>
          {completeCount} of {courseManifest.modules.length} modules passed.
          Final assessment pass mark: {courseManifest.passMark}%.
        </p>
      </div>
      <div className="module-grid">
        {courseManifest.modules.map((module) => (
          <article className="module-card" key={module.slug}>
            <div className="module-card__top">
              <span>Module {String(module.number).padStart(2, '0')}</span>
              <span>{module.durationMinutes} min</span>
            </div>
            <h2>{module.title}</h2>
            <p>{module.objectives[0]}</p>
            <a
              className="button button--secondary"
              href={`/learn/?lesson=${module.slug}`}>
              {progress[module.slug]?.passed ? 'Review module' : 'Start module'}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function CourseReader() {
  const [progress, setProgress] = useState({});
  const [state, setState] = useState({
    loading: false,
    lesson: null,
    course: null,
    error: null,
    status: null,
  });
  const [lessonSlug, setLessonSlug] = useState(null);

  useEffect(() => {
    setProgress(readProgress());
    setLessonSlug(new URLSearchParams(window.location.search).get('lesson'));
  }, []);

  useEffect(() => {
    if (!lessonSlug) return;
    let active = true;
    setState({
      loading: true,
      lesson: null,
      course: null,
      error: null,
      status: null,
    });
    fetch(`/api/course?lesson=${encodeURIComponent(lessonSlug)}`, {
      credentials: 'same-origin',
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          const error = new Error(payload.message || 'Course content unavailable');
          error.status = response.status;
          throw error;
        }
        return payload;
      })
      .then((payload) => {
        if (!active) return;
        setState({
          loading: false,
          lesson: payload.lesson || null,
          assessment: payload.assessment || null,
          course: payload.course || null,
          error: null,
          status: 200,
        });
      })
      .catch((error) => {
        if (!active) return;
        setState({
          loading: false,
          lesson: null,
          course: null,
          error: error.message,
          status: error.status || 500,
        });
      });

    return () => {
      active = false;
    };
  }, [lessonSlug]);

  const markComplete = (slug, score) => {
    const next = {
      ...readProgress(),
      [slug]: {passed: true, score, completedAt: new Date().toISOString()},
    };
    writeProgress(next);
    setProgress(next);
  };

  const previousNext = useMemo(() => {
    if (!lessonSlug || lessonSlug === 'final-assessment') {
      return {previous: courseManifest.modules.at(-1), next: null};
    }
    const index = courseManifest.modules.findIndex(
      (module) => module.slug === lessonSlug,
    );
    return {
      previous: index > 0 ? courseManifest.modules[index - 1] : null,
      next:
        index >= 0 && index < courseManifest.modules.length - 1
          ? courseManifest.modules[index + 1]
          : index === courseManifest.modules.length - 1
            ? {slug: 'final-assessment', title: 'Final assessment'}
            : null,
    };
  }, [lessonSlug]);

  if (!lessonSlug) {
    return (
      <div className="course-shell">
        <CourseNavigation activeSlug={null} progress={progress} />
        <Dashboard progress={progress} />
      </div>
    );
  }

  return (
    <div className="course-shell">
      <CourseNavigation activeSlug={lessonSlug} progress={progress} />
      <main className="lesson-content">
        {state.loading && <div className="loading-panel">Loading protected lesson…</div>}

        {state.error && (
          <section className="access-panel">
            <div className="section-kicker">Protected content</div>
            <h1>
              {state.status === 401
                ? 'Sign in required'
                : state.status === 403
                  ? 'Active enrolment required'
                  : 'Course service unavailable'}
            </h1>
            <p>{state.error}</p>
            <div className="button-row">
              {state.status === 401 && (
                <a className="button button--primary" href="/login">
                  Create account or sign in
                </a>
              )}
              {state.status === 403 && (
                <a className="button button--primary" href="/enrol/">
                  Complete enrolment
                </a>
              )}
              <a className="button button--secondary" href="/learn/">
                Return to dashboard
              </a>
            </div>
          </section>
        )}

        {state.lesson && (
          <>
            <header className="lesson-header">
              <div className="section-kicker">
                Module {String(state.lesson.number).padStart(2, '0')} ·{' '}
                {state.lesson.durationMinutes} minutes
              </div>
              <h1>{state.lesson.title}</h1>
              <div className="objective-panel">
                <strong>Learning objectives</strong>
                <ul>
                  {state.lesson.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>
            </header>

            <article className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {state.lesson.content}
              </ReactMarkdown>
            </article>

            <Activity activity={state.lesson.activity} />

            <Quiz
              questions={state.lesson.quiz}
              passMark={state.course?.passMark || 80}
              storageId={state.lesson.slug}
              onPassed={(score) => markComplete(state.lesson.slug, score)}
            />

            <nav className="lesson-pagination" aria-label="Lesson navigation">
              {previousNext.previous ? (
                <a href={`/learn/?lesson=${previousNext.previous.slug}`}>
                  ← {previousNext.previous.title}
                </a>
              ) : (
                <span />
              )}
              {previousNext.next && (
                <a href={`/learn/?lesson=${previousNext.next.slug}`}>
                  {previousNext.next.title} →
                </a>
              )}
            </nav>
          </>
        )}

        {state.assessment && (
          <>
            <header className="lesson-header">
              <div className="section-kicker">Final assessment</div>
              <h1>OSINT-101 final knowledge assessment</h1>
              <p className="lead">
                Complete all questions. A score of {state.course?.passMark || 80}%
                or higher is required.
              </p>
            </header>
            <Quiz
              questions={state.assessment}
              passMark={state.course?.passMark || 80}
              storageId="final-assessment"
              onPassed={(score) => markComplete('final-assessment', score)}
            />
          </>
        )}
      </main>
    </div>
  );
}
