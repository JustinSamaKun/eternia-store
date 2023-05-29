import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://api.agoramp.com/graphql',
    documents: 'app/graphql/*.ts',
    ignoreNoDocuments: true,
    generates: {
        './app/graphql/generated/': {
            preset: 'client',
        }
    }
}
export default config
