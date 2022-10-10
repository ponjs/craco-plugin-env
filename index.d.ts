import { OverrideCracoConfig } from '@craco/craco'

export interface PluginOptions {
  variables?: Record<string, string>
  envDir?: string
}

declare const CracoEnvPlugin: {
  overrideCracoConfig: OverrideCracoConfig<PluginOptions>
}

export default CracoEnvPlugin
