import { browser, by, element } from 'protractor';
import MockMovie from './mocks/movie.mock';

export class AppDashboardPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getButtonText() {
    return element(by.xpath('/html/body/app-root/dashboard/div[1]/div/div/button')).getText();
  }

  async clickOnCreateMovie() {
    const createMovieButton = element(by.xpath('/html/body/app-root/dashboard/div[1]/div/div/button')).getWebElement();
    await createMovieButton.click();
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  getCreateMovieModalCssClass() {
    const createMovieModalCssClass = element(by.id('createMovieModal')).getAttribute('class');
    return createMovieModalCssClass;
  }

  getEditMovieModalCssClass() {
    const updateMovieModalCssClass = element(by.id('updateMovieModal')).getAttribute('class');
    return updateMovieModalCssClass;
  }

  getDeleteMovieModalCssClass() {
    const updateMovieModalCssClass = element(by.id('deleteMovieConfirmationModal')).getAttribute('class');
    return updateMovieModalCssClass;
  }

  async fillCreateMovieForm(title = MockMovie.title, description = MockMovie.description, genre = MockMovie.genre) {
    const inputTitle = element(by.xpath('//*[@id="name"]')).getWebElement();
    const xpath = '//*[@id="updateMovieModal"]/app-movieform/div/div/div[2]/form/div/input';
    const inputDescription = element(by.xpath('//*[@id="description"]')).getWebElement();
    const inputGenre = element(by.xpath('//*[@id="genre"]')).getWebElement();

    await inputTitle.sendKeys(title);
    await inputDescription.sendKeys(description);
    await inputGenre.sendKeys(genre);


    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  async fillupdateMovieForm(title = MockMovie.title, description = MockMovie.description, genre = MockMovie.genre) {
    const inputTitle = element(by
      .xpath('//*[@id="updateMovieModal"]/app-movieform/div/div/div[2]/form/div[1]/input'))
      .getWebElement();
    const inputDescription = element(by
      .xpath('//*[@id="updateMovieModal"]/app-movieform/div/div/div[2]/form/div[2]/input'))
      .getWebElement();
    const inputGenre = element(by
      .xpath('//*[@id="updateMovieModal"]/app-movieform/div/div/div[2]/form/div[3]/input'))
      .getWebElement();
    // clearing existing values.
    await inputTitle.clear();
    await inputDescription.clear();
    await inputGenre.clear();
    // refilling new values.
    await inputTitle.sendKeys(title);
    await inputDescription.sendKeys(description);
    await inputGenre.sendKeys(genre);


    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  getCreateModalSubmitButton() {
    const submitButton = element(by.xpath('//*[@id="createMovieModal"]/app-movieform/div/div/div[2]/form/button[1]')).getWebElement();
    return submitButton;
  }

  getUpdateModalSubmitButton() {
    const submitButton = element(by.xpath('//*[@id="updateMovieModal"]/app-movieform/div/div/div[2]/form/button[1]')).getWebElement();
    return submitButton;
  }

  getDeleteModalDeleteButton() {
    const deleteButton = element(by.xpath('//*[@id="deleteMovieConfirmationModal"]/div/div/div[3]/button[2]')).getWebElement();
    return deleteButton;
  }

  getMovieElement(id) {
    const xpath = '/html/body/app-root/dashboard/div[2]/' + 'div[' + id + ']/div/div/div/h4';
    const movieElement = element(by.xpath(xpath)).getWebElement();
    return movieElement;
  }

  async clickOnMovieEdit(id) {
    const xpath = '/html/body/app-root/dashboard/div[2]/div[' + id + ']/div/div/div/div/div[2]/a';
    const editMovie = element(by.xpath(xpath)).getWebElement();
    await editMovie.click();
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  async clickOnDeleteMovie(id) {
    const xpath = '/html/body/app-root/dashboard/div[2]/div[' + id + ']/div/div/div/div/div[1]/a';
    const deleteMovie = element(by.xpath(xpath)).getWebElement();
    await deleteMovie.click();
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  async checkForElement(xpath) {
    return new Promise(async (resolve, reject) => {
    try {
      const webElement = await element(by.xpath(xpath)).isPresent();
      resolve(true);
    } catch (err) {
      resolve(false);
    }
    });
  }
}
