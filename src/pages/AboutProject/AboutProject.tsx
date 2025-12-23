import { TabList } from "@headlessui/react";
import {
  coreFeatures,
  roadmap,
  stackItems,
} from "../../constants/aboutProject.js";
import { BulletList } from "../../UI/BulletList.js";
import TitleAccent from "../../UI/TitleAccent.js";
import TagList from "../../UI/TagList.js";

export default function AboutProject() {
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
          <TitleAccent variant="h2">Стек технологий</TitleAccent>

          <TagList items={stackItems} />
        </section>

        <section className="space-y-4">
          <TitleAccent variant="h2">Основной функционал</TitleAccent>

          <BulletList items={coreFeatures} />
        </section>

        <section className="space-y-4">
          <TitleAccent variant="h2">Планируемое развитие</TitleAccent>

          <BulletList items={roadmap} />
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
