# GOV.UK Search Relevance Scoring Tool

A tool that can be used to collect manual relevance judgements from users as they search gov.uk.

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

## Accessing the data

The scores can be pulled to your local machine via the cloud foundry plugin `conduit`. Before running these commands you will need to be added to the appropriate organisation on paas.
1. [Raise a support ticket](https://www.cloud.service.gov.uk/support) to be added
2. Install the [CF CLI](https://docs.cloud.service.gov.uk/get_started.html#set-up-the-cloud-foundry-command-line)
3. [Login](https://docs.cloud.service.gov.uk/get_started.html#sign-in-to-cloud-foundry) to Cloud Foundry
4. Select the organisation
5. Select the space
6. Get the service name by running:

```sh
$ cf services
```
6. Then run:

```sh
$ cf conduit SERVICE_NAME -- pg_dump --file NAME_YOU_CHOOSE
```
