import {
  defineNuxtModule,
  createResolver,
  installModule,
  addImportsSources, addComponent,
} from "@nuxt/kit";
import { name, version } from '../package.json';
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import type { CollectionNames, IconsPluginOptions } from "@egoist/tailwindcss-icons";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * The icon collections to use
   * @default ['heroicons', 'lucide']
   */
  icons: CollectionNames[] | 'all' | IconsPluginOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'blanked',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    icons: ['heroicons', 'lucide'],
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve('./runtime');

    console.log('runtimeDir', runtimeDir)

    await installModule('nuxt-icon')
    await installModule('@nuxt/fonts')
    addImportsSources({
      from: 'vue-sonner',
      imports: ['toast'],
    })
    await addComponent({
      name: 'Toaster',
      source: 'vue-sonner',
    })
  }
})
