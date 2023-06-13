rm -rf dist &&
npm run build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M gh-pages &&
git remote add origin git@github.com:wlin00/React-Tic-Tac-Toe.git &&
git push -f -u origin gh-pages &&
cd -
