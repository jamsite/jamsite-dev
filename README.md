# Jamsite-dev

Jamsite-dev - Development version of Jamsite framework.

## Usage

Install `jamsite-cli` globally with `npm i -g @jamsite/jamsite-cli`.

Execute `jamsite start-dev` in a folder with site template (e.g. https://github.com/jamsite/brewing-starter-site):

`% jamsite start-dev`

Open Browsersync url from output in a browser (http://localhost:3000):

```
[Browsersync] Proxying: http://localhost:3030
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.239:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 --------------------------------------
 ```

## TODO

- :heavy_check_mark: pluggable asset bundler (webpack, rollup)
- restart server on api changes
- dev mode custom error page with mini tutorial
- dev api, e.g. create new page interface from default 404 page
