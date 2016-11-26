Structure
---------
2x Classic HTTP endpoints
1x WebSocket channel
Some node task library...
PhantomJS (We can use node-phantom from npm)

HTTP Endpoints
--

1. HTTP App endpoint:
    - loads bundled react app.
2. HTTP API Keyword endpoint:
    - accepts JSON request containing keyword search terms.
    - Calls a handler function, which fires off scraping tasks.

WebSocket Channels
------------------

1. Object graph updates:
    - Whenever a scraping task updates the object graph for associated keywords, the updated graph is pushed to client.

Tasks
-----
1. Get products/companies from Amazon
2. Get products/companies from Alibaba

Scraping/PhantomJS
------------------
We can use ScraperJS (which runs PhantomJS) to scrape stuff from websites easier.
Samples here: https://github.com/ruipgil/scraperjs

Amazon and Alibaba you can use the simple, Static scraper model.
For things like LinkedIn we can set up the Dynamic Scraper, which uses phantom - we can then inject jquery and click through pages.

Data structure
--------------

Sample object graph of a record in MongoDb (please correct this if there are errors):

```
{
    "keywords": "ereader e-ink epaper",
    "companies": [
        {
            "name": "Sony",
            "products": [
                {
                    "name": "Sony PRS-600BC Touch Edition E-Book Reader"
                },
                {
                    "name": "Sony PRS-505 Portable Digital e-Reader System (Silver)"
                }
            ]
        },
        {
            ...
        }
    ]
}
```

Deployment
----------
Heroku still looks like a goer.

Using PhantomJS, we should be able to deploy to Heroku and run it there.
Read: http://stackoverflow.com/questions/12495463/how-to-run-phantomjs-on-heroku

TL;DR Apparently, we have to also deploy the 64-bit linux binary of PhantomJS, and it will work on Heroku. Instructions in this SO:
http://phantomjs.org/download.html