/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2015 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

// import { responseDecodedExample, responseBase64Example, questionExample } from './limesurveyExampleData'

const responseBody = require('./samples/answer').responseBase64()
const questionExample = require('./samples/question').questionList()

const buffer = Buffer.from(responseBody.result, 'base64')

const convertBase64ToObject = (encoded) => {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8')
    return JSON.parse(decoded)
}

const getResponses = () => (convertBase64ToObject(responseBody.result)).responses
const getQuestions = () => questionExample.result

const listQuestions = getQuestions()
const listResponses = getResponses()
// console.log(listResponses)


const array = [1,2,3,4,5]
// listQuestions.forEach(item => console.log(item))
// console.log(listQuestions)

let parsedAnswers = []

listResponses.forEach((item, idx) => {
    const response = (Object.values(item))[0]
    const answerFilter = /(E\d)/g
    const limesurveyResponse = Object.entries(response)
    const filteredAnswers = limesurveyResponse
        .filter(val => val[0].match(answerFilter))
        .map(array2d => ({
            field: array2d[0],
            type: null,
            title: null,
            value: array2d[1],
        }))
    const answerHeader = {
        startedAt: response.startdate,
        submittedAt: response.submitdate,
        completed: Boolean(response.submitdate),
        user: null,
        organization: null,
    }

    const result = (answerHeader, filteredAnswers) => {
        let answer = {}
        answer.answers = filteredAnswers
        return Object.assign(answerHeader, answer)
    }

    parsedAnswers.push(result(answerHeader, filteredAnswers))
    
    // Aqui vai o teste
    console.log(JSON.stringify(parsedAnswers, null, 4))

})
//




// { id: '147',
//     submitdate: '2017-07-13 16:50:48',
//     lastpage: '1',
//     startlanguage: 'pt-BR',
//     token: 'ucBxxW2J3Kb52TY',
//     startdate: '2017-07-13 16:33:54',
//     datestamp: '2017-07-13 16:50:48',
//     'E0[SQ001_SQ001]': 'HP CONFECCOES HUMBERTO PASCUINI LTDA',
//     'E0[SQ002_SQ001]': 'http://confeccoeshp.com.br/',
//     'E0[SQ003_SQ001]': '220',
//     'E0[SQ004_SQ001]': 'Av. Washington Luiz, 375 e 379, Espírito Santo do Pinhal-SP. CEP: 13.990-000',
//     'E1[SQ001_SQ001]': 'Romildo',
//     'E1[SQ002_SQ001]': 'Barbosa',
//     'E1[SQ003_SQ001]': 'Gerente TI',
//     'E1[SQ004_SQ001]': 'confeccoeshp@confeccoeshp.com.br',
//     'E1[SQ005_SQ001]': '19 36519756',
//     'E2[SQ001]': 'Sim',
//     'E2[SQ002]': 'Não',
//     'E2[SQ003]': 'Não',
//     'E2[SQ004]': 'Não',
//     'E2[SQ005]': 'Não',
//     'E2[other]': '',
//     E3: '1 a 50',
//     'E3[other]': '',
//     'E04[SQ001]': 'Não',
//     'E04[SQ002]': 'Não',
//     'E04[SQ003]': 'Não',
//     'E04[SQ004]': 'Não',
//     'E04[SQ005]': 'Sim',
//     'E04[other]': '',
//     'E05[SQ001]': 'Não',
//     'E05[SQ002]': 'Sim',
//     'E05[SQ003]': 'Sim',
//     'E05[SQ004]': 'Não',
//     'E05[other]': '',
//     E06: 'Não temos nenhum projeto de mudanças',
//     'E06[other]': '',
//     E99: 'Não qualifica',
//     'E99[comment]': 'Empresa familiar, estão satisfeitos com o atual servidor, trabalham com apenas 40 contas, não tem em vista um projeto de mudança.\r\n' }




