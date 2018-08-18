# Russian Twitter Trolls with Neo4j, GraphQL and React

This project comprises of 3 components:

1. `/import` - A set of jupyter notebooks (Python):
    - `find_avail_archived.ipynb` - Query the Internet Archive's [Wayback Machine API](https://archive.org/help/wayback_api.php) for available Twitter user page caches;
    - `scrape_tweets.ipynb` - Scrape tweets from Internet Archive cached pages;
    - `neo4j_import.ipynb` - Import tweets into Neo4j, define a GraphQL schema and export it as `typeDefs.graphql` file.
2. `/graphql` - A GraphQL API server (Javascript) connected to Neo4j.
3. `/react` - A React app (Javascript) connected to the GraphQL API.

*Please refer to each respective README for more details.*


### Installation

You will need to connect to a Neo4j database in this project.

If you are on a Debian-based distro (I use Xubuntu) and you want to develop on your machine, you can install Neo4j Community Edition following [this guide](https://neo4j.com/docs/operations-manual/current/installation/linux/debian/).

Neo4j requires Java 8. If you have several Java versions installed, you can manage them with:

```shell
sudo update-alternatives --config java
```

Start the Neo4j daemon with:

```sh
sudo service neo4j start
```

Check that Neo4j is up and running by visiting:

```
http://localhost:7474/browser/
```


### Neo4j

*Datamodel*

!["Neo4j Datamodel"](img/datamodel.png)


*Interesting Queries*

~~~
// Tweets for @TEN_GOP
MATCH (u:User)-[:POSTED]->(t:Tweet)-[:HAS_TAG]->(h:Hashtag)
WHERE u.screen_name = "TEN_GOP"
OPTIONAL MATCH (t)-[:HAS_LINK]->(l:Link)
RETURN *
~~~

!["Tweets by TEN_GOP"](img/ten_gop.png)

~~~
// What hashtags are used by the most users in the dataset
MATCH (u:User)-[:POSTED]->(t:Tweet)-[:HAS_TAG]->(ht:Hashtag)
WITH ht.tag AS hashtag, COLLECT(u.screen_name) AS users
RETURN hashtag, SIZE(users) AS num_users ORDER BY num_users DESC LIMIT 10



╒══════════════════════╤═══════════╕
│"hashtag"             │"num_users"│
╞══════════════════════╪═══════════╡
│"JugendmitMerkel"     │90         │
├──────────────────────┼───────────┤
│"TagderJugend"        │89         │
├──────────────────────┼───────────┤
│"politics"            │61         │
├──────────────────────┼───────────┤
│"news"                │30         │
├──────────────────────┼───────────┤
│"sports"              │28         │
├──────────────────────┼───────────┤
│"Merkel"              │26         │
├──────────────────────┼───────────┤
│"ColumbianChemicals"  │25         │
├──────────────────────┼───────────┤
│"WorldElephantDay"    │22         │
├──────────────────────┼───────────┤
│"crime"               │21         │
├──────────────────────┼───────────┤
│"UnitedStatesIn3Words"│21         │
└──────────────────────┴───────────┘
~~~

~~~
// What hashtags are used together most frequently
MATCH (h1:Hashtag)<-[:HAS_TAG]-(t:Tweet)-[:HAS_TAG]->(h2:Hashtag)
WHERE id(h1) < id(h2)
RETURN h1.tag, h2.tag, COUNT(*) AS num ORDER BY num DESC LIMIT 15

╒═════════════════╤══════════════════╤═════╕
│"h1.tag"         │"h2.tag"          │"num"│
╞═════════════════╪══════════════════╪═════╡
│"JugendmitMerkel"│"TagderJugend"    │89   │
├─────────────────┼──────────────────┼─────┤
│"TagderJugend"   │"WorldElephantDay"│22   │
├─────────────────┼──────────────────┼─────┤
│"JugendmitMerkel"│"WorldElephantDay"│22   │
├─────────────────┼──────────────────┼─────┤
│"JugendmitMerkel"│"Dschungelkönig"  │21   │
├─────────────────┼──────────────────┼─────┤
│"TagderJugend"   │"Dschungelkönig"  │21   │
├─────────────────┼──────────────────┼─────┤
│"Merkel"         │"JugendmitMerkel" │17   │
├─────────────────┼──────────────────┼─────┤
│"Merkel"         │"TagderJugend"    │17   │
├─────────────────┼──────────────────┼─────┤
│"CDU"            │"JugendmitMerkel" │12   │
├─────────────────┼──────────────────┼─────┤
│"CDU"            │"TagderJugend"    │12   │
├─────────────────┼──────────────────┼─────┤
│"TagderJugend"   │"Thailand"        │11   │
└─────────────────┴──────────────────┴─────┘
~~~

~~~
// Most common domains shared in tweets
MATCH (t:Tweet)-[:HAS_LINK]->(u:Link)
WITH t, replace(replace(u.url, "http://", '' ), "https://", '') AS url
RETURN COUNT(t) AS num, head(split(url, "/")) ORDER BY num DESC LIMIT 10

╒═════╤═════════════════════════╕
│"num"│"head(split(url, \"/\"))"│
╞═════╪═════════════════════════╡
│835  │"pic.twitter.com"        │
├─────┼─────────────────────────┤
│120  │"bit.ly"                 │
├─────┼─────────────────────────┤
│105  │"\n\n"                   │
├─────┼─────────────────────────┤
│100  │"pbs.twimg.com"          │
├─────┼─────────────────────────┤
│32   │"vk.com"                 │
├─────┼─────────────────────────┤
│21   │"riafan.ru"              │
├─────┼─────────────────────────┤
│21   │"inforeactor.ru"         │
├─────┼─────────────────────────┤
│20   │"nevnov.ru"              │
├─────┼─────────────────────────┤
│17   │"goodspb.livejournal.com"│
├─────┼─────────────────────────┤
│15   │"www.fox5atlanta.com"    │
└─────┴─────────────────────────┘
~~~


### Credits

This is a fork from [William Lyon's repo](https://github.com/johnymontana/russian-twitter-trolls). Don't miss his [excellent tutorial](https://www.lyonwj.com/2017/11/12/scraping-russian-twitter-trolls-python-neo4j/) for a thorough explanation of the project.