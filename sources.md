# Data Sources

Note that some of these documents are too large for bench. To this end we may need to textract them first.
Python textract seems to do a lot better than our bench component but results will cary.

## UNDoc https://www.unodc.org/

Dir: unodc

Contains journals downloaded. This set contains the key document from the global database that includes the cites database. However it's level data in a PDF.

***The key information we need is here*** and have already run it through our text extractor so we can start to pull figures from it:

- World_Wildlife_Report_2020_9July.pdf - too large for bench!
- World_Wildlife_Report_2020_9July.txt


Would be good to scrape more information from the site but is to do. And also pass the document through textract to see if we get a better result.

## African Elephant Journal https://africanelephantjournal.com/

Dir : african_elephant_journal

There are the following json line, text file and an image scraped from the website feeds. Json lines contain a title, date and text

| Feed  | File | Notes |
|-------|------|-------|
| commentary    |  jae_commentary.jl        |         |
| press release |  jae_press_releases.jl    |         |
| reports       |  jae_reports.jl           | Text commentary presenting reports, collected separately in the reports sub-dir        |
| news          |  jae_news.jl              |         |
| studies       |  jae_studies.jl           |         |
| facts         |  jae_facts.jpg            | Facts is just one page but looked quite informative so just took the image. Show highlevel stats on elephant populations        |
| facts         |  jae_facts.text           | Supporting text from the facts page        |

Subdir: reports

This contains the reports downloaded from the reports feed where links where still active. They were in various formats mostly PDF.


## Cites Database https://trade.cites.org/

Dir: cites_database

Downloaded the entire cites database. There's some supporting commentary and usage docs.
Looks like a CSV format. Note that this data goes into the UNDOC database so this is comparatively incomplete but we do have the raw data.

## Routes https://routespartnership.org/

Dir: routes

Contains journals downloaded. I intend to fully scrape this sight but is todo


