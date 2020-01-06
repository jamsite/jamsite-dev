# Jamsite-dev

Jamsite-dev - Development version of Jamsite framework.

## Usage

Jamsite-dev must be installed locally `npm install @jamsite/jamsite-dev` or globally `npm install -g @jamsite/jamsite-dev`.

Execute jamsite in a folder with site template (e.g. https://github.com/jamsite/brewing-starter-site):

`npx jamsite`

Open Browsersync url from output in a browser (http://localhost:3000):

```
jamsite: Accepting connections on http://127.0.0.1:3030
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
