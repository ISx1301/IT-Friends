import { D as DEFAULT_LANG } from './chunks/constants_CZJe0MuS.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_D0Wpoyhi.mjs';
import 'kleur/colors';
import './chunks/astro/server_Cb6GeMOu.mjs';
import 'clsx';
import 'cookie';
import { s as sequence } from './chunks/index_DsLKTNa9.mjs';

const onRequest$1 = async (context, next) => {
  const { lang = DEFAULT_LANG } = context.params;
  if (!context.locals.lang) {
    context.locals.lang = lang;
  }
  return next();
};

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
