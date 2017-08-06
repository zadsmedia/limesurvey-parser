const result = require('./samples/limesurvey-json')

var output = []

result.forEach((r) => {

    var obj = {
        "startedAt": r["startdate. Data de início"],
        "submittedAt": r["submitdate. Data de envio"],
        "completed": true,
        "user": null,
        "organization": "BRA:" + r["firstname. Nome"],
        "token": r["token. Código de acesso"],
        "answers": []
    }

    var questions = Object.keys(r).filter(val => val.match(/E\d{1,2}[[.]\s?/))

    questions.forEach((q) => {
        var field = q.substring(0, q.indexOf('.'))
        var type = "short_text"
        
        var title = ""
        if (field.indexOf('SQ') >= 0 || field.indexOf('other') >= 0 || field.indexOf('comment') >= 0)
            title = q.substring(q.indexOf(' [') + 2, q.lastIndexOf(']')).replace(/[\]\[]/g, '')
        else
            title = q.substring(q.indexOf('.') + 2)

        var group = ""
        if (field.indexOf('SQ') >= 0 || field.indexOf('other') >= 0 || field.indexOf('comment') >= 0)
            group = q.substring(q.indexOf('.') + 2, q.indexOf(' ['))
        else
            group = q.substring(q.indexOf('.') + 2)

        var value = r[q];

        obj.answers.push({
                "field": field,
                "type": type,
                "title": title,
                "value": value,
                "group": group
            }
        )
    })

    output.push(obj)
})

console.log(output[100])
