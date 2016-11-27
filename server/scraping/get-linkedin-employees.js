var Horseman = require('node-horseman')
var _ = require('lodash')
var $ = require('jquery')
var uuid = require('uuid')

function getCompanyIdUrl(search) {

    search.replace(' ', '+')
    return 'https://www.linkedin.com/vsearch/c?keywords="'+search+'"&trk=vsrp_companies_sel'
}

function getPeopleByCompanyUrl(search, companyId) {

    return 'https://www.linkedin.com/vsearch/p?keywords='+search+'&openFacets=N,G,CC&f_CC='+companyId
}

/*
    Call this to scrape public employees profiles related to a company.
    Params:
		'company' - The company object to search for.
		'newEmployeeCallback' - The callback to which new employees are passed, as they are discovered.
 */
// export default function scrapeEmployees(company, newEmployeeCallback){
function scrapeEmployees(company, newEmployeeCallback){

    let horseman = new Horseman()

    horseman.options.cookiesFile = 'cookies'

    horseman.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36')

    //Open the first page and log in.
    .open('https://www.linkedin.com')
    .type('#login-email', 'sebastian@monkmage.com')
    .type('#login-password', 'hackjunction')
    .screenshot('start.bmp')
    .click('#login-submit')
    .waitForSelector('#main-search-box')
    .screenshot('logged-in.bmp')

    //Open a search for the Company name, take the top result.
    .openTab(getCompanyIdUrl(company.name))
    .waitForSelector('#results-container h3')
    .screenshot('searched.bmp')
    .do(function(done){

        horseman.html('#results-container h3').then(function(element){

            //Look up LinkedIn's company Id from the link's href.
            var re = /href="\/company\/(\d+)\?/
            var companyId = re.exec(element)[1]

            //Open a search for People who's current Company is the same.
            horseman.openTab(getPeopleByCompanyUrl(company.name, companyId))
            .waitForSelector('#results-container')
            .screenshot('people.png')
            .evaluate(function() {

                return $('ol#results li h3 > a')
                .map(function(i, el) { return {
                    name: $(el).text(),
                    href: $(el).attr('href')
                } })
                .filter(function(i, item) { return item.name != 'LinkedIn Member'})
            })
            .then(function(people) {
                _.each(people, function(person) {
                    var employee = {
                        id: uuid(),
                        name: person.name,
                        href: person.href,
                        companyId: company.id
                    }

                    newEmployeeCallback(employee)
                })
            })
            .then(done)
        })
    })
        .then(function() {

            horseman.close()
        }, function(error){

            console.log(error)
            horseman.close()
        })
}

scrapeEmployees({id: 1, name: 'popslate'}, function(e) {
    console.log('Employee: '+JSON.stringify(e))
})
