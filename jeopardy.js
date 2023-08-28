// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
// AN: All categories will be stored in an array of objects. Each object is a column of a specific subject category.
//start with declare variables
let categories = [];
let allCategoriesArr = [];
let catObj = [];
let count = 0;
let $startBtn = $(`#start`)
let gameState = `off`;
let $spinner = $(`#spin-container`);

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

//retrieve ID #s from jservice API. Then, pull 100 categories & randomly pick 6 for the game.
async function getCategoryIds() {
    categories = [];
    tempCats = [];
    //await all API data with var catRes
    let catRes = await axios.get("https://jservice.io/api/categories", {params: {count:100}});
    catRes.data.map(elm => {
        tempCats.push(elm.id);
    })
    //_.sampleSize is an array method to randomly pick 6 elements
    let randomCats = _.sampleSize(tempCats, 6);
    categories.push(randomCats);
    return categories;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    //await all API data with var catRes again but with catIds array within function
    let catRes = await axios.get(`https://jservice.io/api/category?id=${catId}`);
    let tempObj = {};
    tempObj.title = catRes.data.title;
    tempObj.clues = catRes.data.clues.map(elm => ({
        question: elm.question,
        answer: elm.answer,
        showing: `?`,
    }));
    if (tempObj.clues.length < 5) {
        location.reload();
    }
    return tempObj;
}

//for each category ID, run through getCategory function to retreieve clues
async function allCategories([categories]){
    for (let category of categories){
        let tempObj = await getCategory(category);
        allCategoriesArr.push(tempObj);
    }
    //if all categories load successfully, show the start button
    $startBtn.show();
    hideLoadingView();
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,https://www.youtube.com/watch?v=RLZR1GdMJps
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(categories) {
    let $table = $(`#jeopardy`);
    let $htmlTable = $(`
        <table>
            <thead>
                <tr>
                    <th class ="title">
                    ${allCategoriesArr[0].title}
                    </th>
                    <th class ="title">
                    ${allCategoriesArr[1].title}
                    </th>
                    <th class ="title">
                    ${allCategoriesArr[2].title}
                    </th>
                    <th class ="title">
                    ${allCategoriesArr[3].title}
                    </th>
                    <th class ="title">
                    ${allCategoriesArr[4].title}
                    </th>
                    <th class ="title">
                    ${allCategoriesArr[5].title}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class ="question" data-question-id="0" data-clues-id="0">
                    ${allCategoriesArr[0].clues[0].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="0">
                    ${allCategoriesArr[1].clues[0].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="0">
                    ${allCategoriesArr[2].clues[0].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="0">
                    ${allCategoriesArr[3].clues[0].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="0">
                    ${allCategoriesArr[4].clues[0].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="0">
                    ${allCategoriesArr[5].clues[0].showing}
                    </td>
                </tr>
                <tr>
                    <td class ="question" data-question-id="0" data-clues-id="1">
                    ${allCategoriesArr[0].clues[1].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="1">
                    ${allCategoriesArr[1].clues[1].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="1">
                    ${allCategoriesArr[2].clues[1].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="1">
                    ${allCategoriesArr[3].clues[1].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="1">
                    ${allCategoriesArr[4].clues[1].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="1">
                    ${allCategoriesArr[5].clues[1].showing}
                    </td>
                </tr>
                <tr>
                    <td class ="question" data-question-id="0" data-clues-id="2">
                    ${allCategoriesArr[0].clues[2].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="2">
                    ${allCategoriesArr[1].clues[2].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="2">
                    ${allCategoriesArr[2].clues[2].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="2">
                    ${allCategoriesArr[3].clues[2].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="2">
                    ${allCategoriesArr[4].clues[2].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="2">
                    ${allCategoriesArr[5].clues[2].showing}
                    </td>
                </tr>
                <tr>
                    <td class ="question" data-question-id="0" data-clues-id="3">
                    ${allCategoriesArr[0].clues[3].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="3">
                    ${allCategoriesArr[1].clues[3].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="3">
                    ${allCategoriesArr[2].clues[3].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="3">
                    ${allCategoriesArr[3].clues[3].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="3">
                    ${allCategoriesArr[4].clues[3].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="3">
                    ${allCategoriesArr[5].clues[3].showing}
                    </td>
                </tr>
                <tr>
                    <td class ="question" data-question-id="0" data-clues-id="4">
                    ${allCategoriesArr[0].clues[4].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="4">
                    ${allCategoriesArr[1].clues[4].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="4">
                    ${allCategoriesArr[2].clues[4].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="4">
                    ${allCategoriesArr[3].clues[4].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="4">
                    ${allCategoriesArr[4].clues[4].showing}
                    </td>
                    <td class ="question" data-question-id="0" data-clues-id="4">
                    ${allCategoriesArr[5].clues[4].showing}
                    </td>
                </tr>
            </tbody>
        </table>
    `)
    $table.append($htmlTable);
    hideLoadingView();
    changeStartBtn();
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
$(`#jeopardy`).on("click", function handleClick(e){
    let questionId = $(e.target).closest(".question").data("question-id");
    let clueId = $(e.target).closest(".question").data("clues-id");
    const question = allCategoriesArr[questionId].clues[clueId];
    //if showing is ?, set to clue question
    if (question.showing === `?`){
        question.showing = question.question;
        let $selection = $(e.target).closest(".question");
        $selection.addClass(`text-question`);
        $selection.html(question.showing);
    }
    else if (question.showing === question.question){
        question.showing = question.answer;
        let $selection = $(e.target).closest(".question");
        $selection.addClass(`answer`);
        $selection.html(question.showing);
    }
    else if (question.showing === question.answer){
        console.log(`last step`)
        return;
    }
});

$startBtn.on("click", async function handleEpisodeClick(e) {
  if (gameState === `off`){
    loadTableAndStart()
  } else if (gameState === `ongoing`){
    location.reload();
  } 
})

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $spinner.show();
}

// /** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $spinner.hide();

}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupCategories() {
    await getCategoryIds();
    await allCategories(categories);

}

async function loadTableAndStart() {
    await fillTable(categories);
    gameState = "ongoing";
}
/** On click of start / restart button, set up game. */

function changeStartBtn(){
    $startBtn.html("Restart Game");
}

setupCategories();
