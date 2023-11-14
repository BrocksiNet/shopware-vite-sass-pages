# Vite and Sass (SCSS) for Shopware 6 Pages
Theme to use Shopware 6 with Vite and Sass (SCSS) for specific pages (to have the ability to split CSS).

## Why
This theme (plugin) is a **proof of concept** to experiment and improve the CSS for Shopware 6.

## What
- Provides **Vite** Support for Shopware 6 with default Storefront (twig)
- Adds a SCSS watch and build command
- Uses Lightning CSS to transform and minify the css files from dist
- Outputs the build to `public/build` folder
- Provides a separate `product.css` instead of `all.css` file
  - Under construction: Checkout, Home, Listing, Contact ... you name it
- Allows to combine own scss files with core scss files (see load-path)
- Uses a Rollup Plugin to generate critical css (see `PluginCritical` in `vite.config.js`)
- Extends `storefront/layout/meta.html.twig` to use Symfony & Vite ([see](https://symfony-vite.pentatrion.com/guide/getting-started.html))

## Limitations
- This theme (plugin) **expect** the Shopware core inside the `src` folder of the project (not tested with core in vendor)
- This theme (plugin) does not support different SalesChannels with different theme config / color variables and so on
- Currently, there are no assets files integrated like images, fonts and so on

## Results
- From 2023-11-14
  - `public/build/assets/product-84b1e655.css` 283.46 kB │ gzip:  43.89 kB
  - `public/build/assets/all-0d8fa2e9.css` 381.57 kB │ gzip:  51.69 kB


## How to set up
- Copy all the plugin files to `custom/plugins/ViteSassPages`
- Require the plugin via composer `composer require brocksinet/vite-sass-pages`
- Execute plugin refresh `bin/console plugin:refresh`
- Install and activate the plugin `bin/console plugin:install ViteSassPages --activate`
- Update `config/bundles.php` file and add `Pentatrion\ViteBundle\PentatrionViteBundle::class => ['all' => true],`
- Add file `config/packages/pentatrion_vite.yaml` with these content:
  ```
  pentatrion_vite:
      crossorigin: anonymous
  ```
- NPM install (from root folder): `cd custom/plugins/ViteSassPages/ && npm i && cd ../../../`
- _Hint:_ Update your URLs for the critical CSS generation in `vite.config.js`, if you do not use `http://localhost:8000/`

## How to use it
- Start Shopware with **devenv**
- Use inside `devenv shell` for development (directory: `cd custom/plugins/ViteSassPages/`)
  - SCSS watch command `npm run scss:watch`
  - Vite dev command `npm run dev`

### Further optimization 
- You can use **purgecss** to remove not used classes (directory: `cd custom/plugins/ViteSassPages/`)
  - e.g. `npx purgecss --css ../../../public/build/assets/all-48786481.css --content ../../../src/Storefront/Resources/views/**/*.html.twig` _(You need to update the file name for the css file to purge)_

## Known problems
- Window console tells you: `module is not defined` comment out:
  ```
  if (module.hot) {
    module.hot.accept();
  }
  ```
  in `src/Storefront/Resources/app/storefront/src/main.js`
- The font `inter-fontface` scss is not imported
- Add `.vite` to your `.gitignore` file in project root