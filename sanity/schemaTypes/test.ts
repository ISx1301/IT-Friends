import { defineType } from "sanity";

export default defineType({
  name: "test",
  title: "Тестова схема",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Текст заголовка",
      type: "string",
    },
  ],
});
