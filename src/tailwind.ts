import { addTemplate, createResolver, installModule, useNuxt } from '@nuxt/kit'
import type { ModuleOptions } from '@nuxt/schema'
import { defu } from 'defu'
import { join } from 'pathe'
import { getIconCollections } from '@egoist/tailwindcss-icons'
import { logo } from './icons'

/**
 * Install and configure TailwindCSS module.
 *
 * @param options - Module options provided by Nuxt.
 * @param nuxt - The Nuxt instance.
 * @param resolve - Resolver function.
 */
export async function installTailwind(options: ModuleOptions, nuxt = useNuxt(), resolve = createResolver(import.meta.url).resolve): Promise<void> {
  const runtimeDir = resolve('./runtime')

  // Define the TailwindCSS configuration template
  const tailwindConfig = addTemplate({
    filename: 'mockline-utils-tailwind.config.cjs',
    write: true,
    getContents: () => generateTailwindConfigContent(runtimeDir, options, resolve),
  }).dst

  // Install TailwindCSS module with custom options and configuration path
  await installModule('@nuxtjs/tailwindcss', defu({
    exposeConfig: true,
    configPath: [
      tailwindConfig,
      join(nuxt.options.rootDir, 'tailwind.config'),
    ],
  }, nuxt.options.tailwindcss))
}

/**
 * Generate the content of the TailwindCSS configuration file.
 *
 * @param runtimeDir - The runtime directory path.
 * @param options - Module options provided by Nuxt.
 * @param resolve - Resolver function.
 * @returns The content of the TailwindCSS configuration file.
 */
function generateTailwindConfigContent(runtimeDir: string, options: ModuleOptions, resolve: (...args: string[]) => string)
  : string {
  // Import required modules for TailwindCSS configuration
  return `
    import plugin, { type Config } from 'tailwindcss';
    import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

    module.exports = {
      darkMode: 'class',
      content: {
        files: [
          ${JSON.stringify(resolve(runtimeDir, 'components/**/*.{vue,mjs,ts}'))},
          ${JSON.stringify(resolve(runtimeDir, '*.{mjs,js,ts}'))},
        ],
      },
      plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
        iconsPlugin(${generateIconsPluginOptions(options)}),
      ],
    };
  `
}

/**
 * Generate options for the icons plugin.
 *
 * @param options - Module options provided by Nuxt.
 * @returns The options for the icons plugin in JSON format.
 */
function generateIconsPluginOptions(options: ModuleOptions): string {
  const collections= {
    custom: logo,
    ...getIconCollections(options.icons)
  }
  return `{ collections: ${JSON.stringify(collections)} }`
}
