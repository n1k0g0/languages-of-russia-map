const Papa = require('papaparse');

var testString = "Чукотский\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Сфера\tОписание с примерами\tИсточник\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Культура\tАнсамбль \"Эргирон\" и другие\thttps://ergyron.ru/\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Образование\tВ поселениях компактного проживания в школах с 1 до 9 класс. 1–7 кл. – 2 ч. в неделю; 8–9 кл. – 1 ч. в неделю.\tЯО 567\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Наука \tИнститут народов севера при РГПУ им. Герцена - подготовка учителей\tЯО 567\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "СМИ\tПриложение к газете «Золотая Чукотка» «Унпэӈэр» (г. Билибино), приложение к газете «Крайний Север» «Вэтгав». Новости на ТВ 3 раза в неделю (всего 75 минут), передачи на Радио России (всего 85 минут в неделю)\tЯО 567\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Судо- и делопроизводство\t-\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Интернет\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Документы, касающиеся языковой политики\t Закон Чукотского автономного округа от 23.10.2017 № 65 - ОЗ \"О родных языках коренных малочисленных народов Севера, Сибири и Дальнего Востока Российской Федерации, проживающих на территории Чукотского автономного округа\" \thttp://publication.pravo.gov.ru/Document/View/8700201710260015?index=0&rangeSize=1\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Городская среда\t-\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
    "Язык\tСамоназвание\tПисьменность\tВитальность\tЮридический статус\tОбщее число носителей в РФ\tДиалекты\tСемья и ветвь \tРегион традиционного распространения\tРегионы, в которых этот язык встречается\t\t\t\t\t\t\t\t\t\n" +
    "чукотский\tлыгъоравэтлъан йилйил\tкириллица\t6b (Threatened)\tофициальный\t5095\tВосточный, западный, энмылинский, нунлигранский и хатырский диалекты\tчукотский язык < чукотско-камчатская семья\tЧукотский автономный округ, республика Саха (Якутия)\t\"Республика Саха (Якутия)\n" +
    "Камчатский Край\n" +
    "Чукотский АО\"\t\t\t\t\t\t\t\t\t\n" +
    "\thttp://web-corpora.net/wsgi3/minorlangs/view/ckt\thttp://web-corpora.net/wsgi3/minorlangs/view/ckt\thttps://www.ethnologue.com/language/ckt\thttp://web-corpora.net/wsgi3/minorlangs/view/ckt\thttp://web-corpora.net/wsgi3/minorlangs/view/ckt\thttps://cyberleninka.ru/article/n/chukotskiy-yazyk-geografiya-govory-i-predstavleniya-nositeley-o-chlenenii-svoey-yazykovoy-obschnosti\thttp://web-corpora.net/wsgi3/minorlangs/view/ckt\thttps://cyberleninka.ru/article/n/chukotskiy-yazyk-geografiya-govory-i-predstavleniya-nositeley-o-chlenenii-svoey-yazykovoy-obschnosti\t\"https://docs.google.com/spreadsheets/d/1PAEfnP-9P_bOS3Kt8wtopjIe_qjTYMXN/edit?usp=sharing&ouid=115370762275408504003&rtpof=true&sd=true\n" +
    "https://docs.google.com/spreadsheets/d/1VJ7rhK4BiGO3IkEULzLtYvHRYrv3UF7o/edit?usp=sharing&ouid=115370762275408504003&rtpof=true&sd=true\n" +
    "https://docs.google.com/spreadsheets/d/1NIwsVUsAw_uCLG6Og4MyGoX98JTgRZ-D/edit?usp=sharing&ouid=115370762275408504003&rtpof=true&sd=true\"\t\t\t\t\t\t\t\t\t"


const fs = require('fs');
const papa = require('papaparse');
const file = fs.createReadStream('./karelia.csv');
var count = 0; // cache the running count

var lang = {
    "name": "Карельский язык",
    "code" : "karelian",
    "family": "финно-угорская ветвь < уральская семья.",
    "dialects": "собственно карельский, людиковский и ливвиковский (или олонецкий). Различия между всеми диалектами настолько велики, что препятствуют взаимопониманию их носителей.",
    "region": "карелы проживают главным образом на западе Республики Карелия, а также в Тверской, Ленинградской, Мурманской, Московской, Архангельской, Вологодской и некоторых других областях России и в Финляндии. Живут также на Украине, в Белоруссии и Эстонии.",
    "alter-name": "–",
    "auto-name": "karjala",
    "script": "латиница (современный язык) / кириллица",
    "vitality": "6b (Threatened)",
    "status": "официальный",
    "natives": "25605",
    "resume": [
        {
            "header": "Искусство",
            "reference" : [
                {
                    "name" :  "Энциклопедия \"Язык и Общество\" (с.207)",
                    "year" : "2016"
                },
                {
                    "name" :  "Статья \"О литературе в карельском языке\"",
                    "url" : "http://www.finnougoria.ru/logos/lit_kritika/1415/14021/"
                },
                {
                    "name" :  "Российская книжная палата",
                    "url" : "http://www.bookchamber.ru/statistics.html"
                }
            ],
            "body" : "В Карелии были изданы три литературных альманаха карелоязычных писателей, в 2006 г. издан сборник произведений молодых карельских авторов «Nuori Karjala» («Молодая Карелия»). Подробно можно прочитать здесь http://www.finnougoria.ru/logos/lit_kritika/1415/14021/ Вот здесь можно найти целое собрание художественной литературы на карельском языке https://opastajat.net/luvekkua/luvekkua.html В 2019 г. по данным Российской книжной палаты было выпущено 11 книг общим тиражом 4550 экземпляров. Пьесы на карельском языке показываются в Национальном театре Республи\u00ADки Карелия, а также в районных театрах, а именно в Калевальском народном театре и в исполнении театрального коллектива Tilkuzet с. Видлицы. Существует кукольный театр «Ciciliusku», выступающий на карельском языке. В Карелии организовано множество музыкальных коллективов и исполнителей, исполняющих песни на национальных языках. Начать стоит с одного из страейших в Карелии народных ансамблей — «Кантеле», участники которого исполняют народные песни и танцы на карельском и вепсском языках. Молодые коллективы также вносят свой вклад в народную культуру, например, \"Toive\", созданный при кафедре прибалтийско-финской филологии Петрозаводского государственного университета. Существует также современная фолк-группа \"Sattuma\", исполняющая песни на финском и карельском языках. «Sattuma» выступают не только в России, они гастролируют и в Америке, Финляндии и Эстонии и регулярно там выступает. Отдельно стоит отметить Андрея Горшкова, известного под сценическим псевдонимом Ondrei и исполняющего рэп на ливвиковском наречии карельского языка."
        },
        {
            "header": "Образование",
            "reference" : [
                {
                    "name" :  "Энциклопедия \"Язык и Общество\" (с.206)",
                    "year" : "2016"
                },
                {
                    "name" :  "Статья \"Карельский язык в системе образования Республики Карелия\"",
                    "url" : "https://pandia.ru/text/78/024/5226.php"
                },
                {
                    "name" :  "Российская книжная палата",
                    "year" : "2019",
                    "url" : "Статья \"Кто и зачем сдаёт карельский язык на ОГЭ\""
                }
            ],
            "body" : "В районах функционируют 22 детских сада, где преподается карельский язык. В двух дошкольных учреждениях (в пос. Калевала и в г. Петрозаводск) карельскому языку обучают детей по принципу «языкового гнезда». В учреждениях начального, общего, среднего и высшего образования не используется как средство образования, однако преподаётся приблизительно в 52 школах (2 или 3 часа в неделю). Существуют учебники карельского языка как для собственно карельского диалекта, так и для ливвиковского диалекта, а также буквари и словари. Большинство изучающих карельский язык — ученики 1-4 классов. Выпускникам предоставляется возможность сдавать ОГЭ и ЕГЭ по карельскому языку. В Петрозаводском государственном университете и Карельской государственной педагогической академии можно получить образование по специально\u00ADсти «карельский язык». На карельском читается ряд курсов. Студенты ПетрГУ пишут курсовые и дипломные работы на карельском языке. В целом, изучение и преподавание местных национальных языков поощряется местным самоуправлением Карелии, и студентам финно-угорского отделения выплачивают повышенные стипендии. Преподавателям, которые преподают местные национальные языки, тоже выплачивается надбавка к заработной плате. Интересно, что также карельский язык преподаётся в Петрозаводской государственной консерватории. В Центре народного творчества в Петрозаводске можно записаться на курсы любого из трех диалектов карельского языка. Большое влияние на поддержку карельского языка оказывает Дом карельского языка в селе Ведлозеро. Его принцип заключается в том, чтобы посетители свободно общались между собой и занимались различной деятельностью на карельском языке, тем самым развивая свой язык. В республике меют место разговорные клубы национальных языков, например, в 2014 году в культурном центре «Людиковский дом» села Святозеро открылся разговорный клуб людиковского наречия карельского языка."
        },
        {
            "header": "Следующий заголовок",
            "reference" : [
                {
                    "name" :  "Некоторый источник",
                    "year" : "год публикации",
                    "url" : "ссылка на источник"
                },
                {
                    "name" :  "Второй источник",
                    "url" : "ссылка на источник"
                }
            ],
            "body" : "Основной текст"}
    ]
}

var reg = {
    "id": 10,
    "name": "Республика Карелия",
    "code": "KL",
    "languages": [
        {
            "name": "Русский",
            "code": "russian",
            "popularity": 1240177
        },
        {
            "name": "Карельский",
            "code": "karelian",
            "popularity": 38107
        },
        {
            "name": "Вепсский",
            "code": "veps",
            "popularity": 2357
        },
        {
            "name": "Финский",
            "code": "finnish",
            "popularity": 29179
        },
        {
            "name": "Украинский",
            "code": "ukrainian",
            "popularity": 14892
        },
        {
            "name": "Белорусский",
            "code": "belorussian",
            "popularity": 8054
        },
        {
            "name": "Другие",
            "code": "others",
            "popularity": 127721
        }
    ]
}


papa.parse(file, {
    worker: true, // Don't bog down the main thread if its a big fileZ
    complete: function(results) {
        console.log("Finished:", results.data);
        reg.id = 0;
        reg.code = 'CH';
        reg.name = results.data[0][1];
        var langCount = 0;
        reg.languages = []
        for (var i = 4; results.data[i][0] !== ''; i++) {
            langCount += 1;
            reg.languages.push({"name" : results.data[i][0], "code": "default", popularity: 0})
        }
        let lang1Line = 5 + reg.languages.length;

        console.log(reg);
        console.log(results.data[lang1Line])
    }
});




readTextFile("./"+code+".json", function(text){
    var data = JSON.parse(text);
    console.log(data);
    headList.innerHTML = data.name;
    langArray = [['Владение языками', 'Количество человек']];
    const listLength = list.childNodes.length;
    for (var j = 0; j < listLength; j++) {
        list.removeChild(list.lastChild);
    }

    for (var i = 0; i < data.languages.length; i++) {
        if (!([[data.languages[i].name, data.languages[i]['popularity']]] in langArray)) {
            langArray.push([data.languages[i].name, data.languages[i]['popularity']]);
        }
        if ((data.languages[i].code !== "russian") && (data.languages[i].code !== "others")) {
            const listElement = document.createElement("li");
            const href2lang = document.createElement("a");
            const listElementText = document.createTextNode(data.languages[i].name+" язык");

            href2lang.href = './'+data.languages[i].code+'.html';
            $.get("./"+data.languages[i].code+".html")
                .done(function() {
                    href2lang.href = "./"+data.languages[i].code+".html";
                }).fail(function() {
                href2lang.href = "./russia.html";
            })

            href2lang.append(listElementText);
            listElement.append(href2lang);
            list.append(listElement);
        }
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
});