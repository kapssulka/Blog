export default function AboutProject() {
  const stackItems = [
    "React",
    "TypeScript",
    "Redux",
    "React Router",
    "Tailwind CSS",
    "Framer Motion",
  ];

  const coreFeatures = [
    "Аутентификация пользователей",
    "Лента постов и публикация контента",
    "Профили пользователей",
    "Лайки и сохранённые посты",
    "Адаптивный интерфейс",
  ];
  const roadmap = [
    "Индикатор прогресса загрузки постов",
    "Подписки на пользователей",
    "Личные сообщения между пользователям",
    "Расширение социальной логики",
  ];

  return (
    <div className="bg-bg-secondary backdrop-blur-sm rounded-2xl py-10 px-6 md:px-10 transition-colors">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">О проекте</h1>
          <p className="text-white/70 leading-relaxed">
            Мини-социальная сеть, реализованная для демонстрации навыков
            разработки frontend-приложений и проектирования пользовательского
            интерфейса.
          </p>
          <p className="text-white/70 leading-relaxed">
            Основная цель проекта — реализовать базовую социальную
            функциональность: публикацию постов, взаимодействие с контентом,
            работу с профилями пользователей и адаптивный интерфейс,
            приближенный к реальным продуктам.
          </p>
          <p className="text-white/70 leading-relaxed">
            Проект находится в активной разработке и постепенно расширяется.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-[#1abc9c]">
            Стек технологий
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {stackItems.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-white/10 px-3 py-1 text-white/80"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-[#1abc9c]">
            Основной функционал
          </h2>
          <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
            {coreFeatures.map((item, index) => (
              <li key={index}>— {item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-[#1abc9c]">
            Планируемое развитие
          </h2>
          <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
            {roadmap.map((item, index) => (
              <li key={index}>— {item}</li>
            ))}
          </ul>
        </section>

        <div className="pt-6 border-t border-white/10">
          <a
            href="https://github.com/kapssulka/Blog"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#1abc9c] hover:opacity-80 transition"
          >
            GitHub Repository →
          </a>
        </div>
      </div>
    </div>
  );
}
