#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 定义变量
push_addr=`git remote get-url --push origin`
commit_info=`git describe --all --always --long`
dist_path=docs/.vitepress/dist
push_branch=gh-pages

# 生成静态文件
npm run docs:build

# 进入生成的静态文件的目录
cd $dist_path

# 将生成的静态文件推送到gh-pages分支
git init
git add -A
git commit -m "deploy, $commit_info"
git push -f $push_addr HEAD:$push_branch

# 删除生成的静态文件的目录
cd -
rm -rf $dist_path
