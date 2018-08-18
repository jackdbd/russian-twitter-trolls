# Russian Twitter Trolls Jupyter Notebooks

Jupyter notebooks for scraping Tweet data from Internet Archive's [Wayback Machine API](https://archive.org/help/wayback_api.php) and importing it into Neo4j.

- `find_avail_archived.ipynb`
- `scrape_tweets.ipynb`
- `neo4j_import.ipynb`


### Installation
Create a virtual environment. I used Python 3.6.

Install all dependencies:

```shell
pip install -r requirements.txt
```

Start the notebook server:

```
jupyter notebook
```


### Environment variables

You will need some environment variables to connect to Neo4j.

You can create a `.env` file in the root of *this* component (i.e. `import/`) and define your environment variables there; they will be loaded with [python-dotenv](https://github.com/theskumar/python-dotenv).

In alternative, you can set the environment variables from a terminal. Here is an example:

```shell
export NEO4J_USERNAME=neo4j
export NEO4J_PASSWORD=password
```


### Usage

First, run `find_avail_archived.ipynb` to find the URLs of the Twitter user pages cached by the Internet Archive's [Wayback Machine API](https://archive.org/help/wayback_api.php).

Second, run `scrape_tweets.ipynb` to download the pages with [requests](http://docs.python-requests.org/en/master/) and scrape the tweets with [lxml](https://pypi.org/project/lxml/) and [XPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Third, run `neo4j_import.ipynb` to import all valid tweets into Neo4j, define a GraphQL schema and export it as `typeDefs.graphql` file (this file will be loaded by the GraphQL API server).

Note: `neo4j_import.ipynb` requires a connection to a Neo4j database. If you installed Neo4j on your machine, check that it's running:

```sh
sudo service neo4j status
```
