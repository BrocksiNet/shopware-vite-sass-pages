import {resolve as resolvePath} from 'path';
import {defineConfig} from 'vite'
import browserslist from "browserslist";
import {browserslistToTargets} from 'lightningcss';
import symfonyPlugin from "vite-plugin-symfony";
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import PluginCritical from 'rollup-plugin-critical';

const customResolver = resolve({
    extensions: ['.js']
});
const storefrontRootDir = resolvePath(__dirname, '../../../src/Storefront/Resources/app/storefront/');
const browserslistTargets = browserslistToTargets(browserslist('>= 0.25%'));

export default defineConfig({
    root: resolvePath(__dirname, '../../../'),
    base: '/build',
    plugins: [
        symfonyPlugin(),
        alias({
            entries: [
                {
                    find: 'src',
                    replacement: resolvePath(storefrontRootDir, 'src')
                }
            ],
            customResolver
        }),
        PluginCritical.default({
            criticalUrl: 'http://localhost:8000/',
            criticalBase: '../../../public/build/assets/critical/',
            criticalPages: [
                { uri: '', template: 'home', base: 'test' },
                { uri: 'Beauty-Computers-Shoes/', template: 'listing' },
                { uri: 'Aerodynamic-Aluminum-Standing-Chocolate/018bc8293df27134bae4ca875e9f9084', template: 'product' },
            ],
            criticalConfig: {},
        }),
    ],
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistTargets
        }
    },
    build: {
        cssMinify: 'lightningcss',
        rollupOptions: {
            input: {
                core_js: storefrontRootDir + '/src/main.js',
                custom_js: resolvePath(__dirname, 'src/Resources/app/storefront/src/main.js'),
                all_css: resolvePath(__dirname, 'src/Resources/app/storefront/dist/storefront/css/all.css'),
                home_css: resolvePath(__dirname, 'src/Resources/app/storefront/dist/storefront/css/home.css'),
                listing_css: resolvePath(__dirname, 'src/Resources/app/storefront/dist/storefront/css/listing.css'),
                checkout_css: resolvePath(__dirname, 'src/Resources/app/storefront/dist/storefront/css/checkout.css'),
                product_css: resolvePath(__dirname, 'src/Resources/app/storefront/dist/storefront/css/product.css'),
            },
            outDir: '../../../public/build'
        },
    },
})
