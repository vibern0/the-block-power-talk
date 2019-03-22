# The Block Power
This is the repository used for *The Block Power* workshop.

## Presentation
See the google presentation [here](https://docs.google.com/presentation/d/1Cjh_2eP6DnILo3bTyxyCs7zP75aTorMxYos_8WfSP-E/edit?usp=sharing).

## Run again on your own
**step1-basic**: make sure to have truffle installed globaly. `npm install -g truffle` (I used version 5.0.0)
1. run `truffle develop`
2. `migrate`

**step1-wDependencies**: it uses an external dependencie, controlled by npm, so you need to install it before running.
1. `npm install` or `yarn`
2. run `truffle develop`
3. `migrate`

**step2**: The client folder is a normal react app with some contracts connected to it.
1. `npm install` or `yarn`
2. link or copy the contracts to src/ folder (`cd src/ && ln -s ../../../step1/wDependencies/build/contracts contracts` in unix systems)
3. `npm run start`

**demo**: Just `npm install` or `yarn` and `npm run coverage`