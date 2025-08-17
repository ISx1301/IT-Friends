import type { MiddlewareHandler } from "astro";
import { DEFAULT_LANG } from "./constants";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { lang = DEFAULT_LANG } = context.params;

  if (!context.locals.lang) {
    context.locals.lang = lang
  }

  
  // context.locals.lang = lang;
  

  return next();
};