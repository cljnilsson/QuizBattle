Quiz Battle


CREATE DATABASE QuizBattle;

Migration: (requires global typeorm install)
typeorm migration:generate -n PostRefactoring
typeorm migration:create -n PostRefactoring