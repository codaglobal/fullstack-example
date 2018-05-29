import {browser} from 'protractor';
import { AppDashboardPage } from './app.po';
import MockMovie from './mocks/movie.mock';

describe('fullstack-example-webui App', () => {
  let page: AppDashboardPage;

  beforeAll(() => {
    page = new AppDashboardPage();
    page.navigateTo();
  });

  it('should display create movie button', () => {
    const text = page.getButtonText();
    expect(text).toEqual('create movie');
  });

  it('should display app title.', () => {
    const pageTitle = page.getTitle();
    expect(pageTitle).toEqual('FullstackExampleWebui');
  });

// describe('create movie', () => {
//   beforeAll(() => {
//     page.navigateTo();
//   });
//
//   it('should return suceesfully when create movie button is clicked', async (done) => {
//     const clickOnCreateMovieButton = await page.clickOnCreateMovie();
//     browser.sleep(3000);
//     const createMovieModalCssClass = page.getCreateMovieModalCssClass();
//     browser.sleep(3000);
//     Promise.all([
//       expect(clickOnCreateMovieButton).toBeTruthy(),
//       expect(createMovieModalCssClass).toContain('show')
//     ]).then((() => {
//       done();
//     })).catch((err) => {
//       done.fail(err);
//     });
//   });
//
//   it('should fill form.', async function (done) {
//     const newTitle = 'new title';
//     /**
//      * create movie test.
//      */
//     const isFormFilled = await page.fillCreateMovieForm();
//     browser.sleep(1000);
//     const createMovieModalSubmitButton = page.getCreateModalSubmitButton();
//     browser.sleep(1000);
//     await createMovieModalSubmitButton.click();
//     const movieTitleElement = page.getMovieElement(1);
//     browser.sleep(1000);
//     /**
//      *
//      * update movie test.
//      */
//     const isEditCliecked = await page.clickOnMovieEdit(1);
//     browser.sleep(1000);
//     console.log('*******clicking on edit********');
//     const editMovieModalCssClass = page.getEditMovieModalCssClass();
//     console.log('*****checked edit modal css *****');
//     browser.sleep(1000);
//     const isFormEdited = await page.fillupdateMovieForm(newTitle);
//     console.log('********filled new title******');
//     browser.sleep(1000);
//     console.log('***checking for update button*****');
//     const updateMovieModalButton = page.getUpdateModalSubmitButton();
//     await updateMovieModalButton.click();
//     browser.sleep(1000);
//     page.navigateTo();
//     const updatedMovieTitleElement = page.getMovieElement(1);
//     browser.sleep(1000);
//     /**
//      * test for delete.
//      */
//     // await page.clickOnDeleteMovie(1);
//     // const deleteMovieModalCssClass = page.getDeleteMovieModalCssClass();
//     // console.log('****got delete css class(*****');
//     // const deleteButton = page.getDeleteModalDeleteButton();
//     // await deleteButton.click();
//     // const xpathOfEditButton = '/html/body/app-root/dashboard/div[2]/div[1]/div/div/div/div/div[2]/a';
//     // const isMovieCardDeleted = !await page.checkForElement(xpathOfEditButton);
//     Promise.all([
//       expect(isFormFilled).toBeTruthy(),
//       expect(createMovieModalSubmitButton.isEnabled).toBeTruthy(),
//       expect(movieTitleElement.getText()).toEqual(MockMovie.title),
//       expect(isEditCliecked).toBeTruthy(),
//       expect(editMovieModalCssClass).toContain('show'),
//       expect(isFormEdited).toBeTruthy(),
//       expect(updatedMovieTitleElement.getText()).toEqual(newTitle),
//       // expect(deleteMovieModalCssClass).toContain('show'),
//       // expect(isMovieCardDeleted).toBeTruthy()
//     ])
//       .then(done())
//       .catch(err => {
//       done.fail(err);
//     });
//   });
// });
});
