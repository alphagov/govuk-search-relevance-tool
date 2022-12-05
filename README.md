# GOV.UK Search Relevance Prototype

A tool that can be used to collect manual relevance judgements from users as they search GOV.UK.

![Search relevance screenshot](docs/assets/relevancy-tool.png)

## Dependencies

Scores are written to a postgres database. So before you can you run the tool locally postgres must be installed and set up.

```sh
$ brew install postgresql
$ brew services start postgresql
```

## Running the tool locally

```sh
$ ./startup.sh --live
```
