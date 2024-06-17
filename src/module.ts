import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  installModule,
  addImportsSources,
} from '@nuxt/kit'
import type { CollectionNames, IconsPluginOptions } from '@egoist/tailwindcss-icons'
import { name, version } from '../package.json'
import { installTailwind } from './tailwind'

export type ModuleOptions = {
  /**
   * Prefix for all components
   */
  prefix?: string,
  /**
   * The icon collections to use
   * @default ['heroicons', 'lucide']
   */
  icons: CollectionNames[] | 'all' | IconsPluginOptions,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'mockline-utils',
  },
  defaults: {
    prefix: 'M',
    icons: ['heroicons', 'lucide'],
  },
  async setup(options: ModuleOptions, nuxt): Promise<void> {
    const {resolve} = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Templates
    await installTailwind(options, nuxt, resolve)

    // Modules
    await installModule('@nuxtjs/color-mode', { classSuffix: '', storageKey: 'mockline-color-mode' })

    // Add vue-sonner
    addImportsSources({
      from: 'vue-sonner',
      imports: ['toast'],
    })

    // Components elements
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false,
    }).then()
  },
})
