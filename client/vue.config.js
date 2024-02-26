import { defineConfig } from '@vue/cli-service'

export default defineConfig({
    devServer: {
        proxy: 'https://github.com/'
    }
})