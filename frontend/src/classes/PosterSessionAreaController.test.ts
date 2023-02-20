import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { nanoid } from 'nanoid';
import { PosterSessionArea } from '../generated/client';
import TownController from './TownController';
import PosterSessionAreaController, {
  PosterSessionAreaEvents,
} from './PosterSessionAreaController';

describe('PosterSessionAreaController', () => {
  // A valid PosterSessionArea to be reused within the tests
  let testArea: PosterSessionAreaController;
  let testAreaModel: PosterSessionArea;
  const townController: MockProxy<TownController> = mock<TownController>();
  const mockListeners = mock<PosterSessionAreaEvents>();
  beforeEach(() => {
    testAreaModel = {
      id: nanoid(),
      title: nanoid(),
      imageContents: nanoid(),
      stars: 1,
    };
    testArea = new PosterSessionAreaController(testAreaModel);
    mockClear(townController);
    mockClear(mockListeners.posterImageContentsChange);
    mockClear(mockListeners.posterStarChange);
    mockClear(mockListeners.posterTitleChange);
    testArea.addListener('posterTitleChange', mockListeners.posterTitleChange);
    testArea.addListener('posterImageContentsChange', mockListeners.posterImageContentsChange);
    testArea.addListener('posterStarChange', mockListeners.posterStarChange);
  });

  describe('updateFrom', () => {
    it('Does not update the id property', () => {
      const existingID = testArea.id;
      const newModel: PosterSessionArea = {
        id: nanoid(),
        title: nanoid(),
        imageContents: nanoid(),
        stars: testAreaModel.stars + 1,
      };
      testArea.updateFrom(newModel);
      expect(testArea.id).toEqual(existingID);
    });
  });
  describe('Setting title property', () => {
    it('updates the model and emits a posterTitleChange event if the property changes', () => {
      const newValue = testAreaModel.title + ' modified';
      testArea.title = newValue;
      expect(mockListeners.posterTitleChange).toBeCalledWith(newValue);
      expect(testArea.title).toEqual(newValue);
    });
    it('does not emit a posterTitleChange event if the isPlaying property does not change', () => {
      const existingValue = testAreaModel.title;
      testArea.title = existingValue;
      expect(mockListeners.posterTitleChange).not.toBeCalled();
    });
  });
  describe('Setting imageContents property', () => {
    it('updates the model and emits a posterImageContentsChange event if the property changes', () => {
      const newValue = testAreaModel.imageContents + ' modified';
      testArea.imageContents = newValue;
      expect(mockListeners.posterImageContentsChange).toBeCalledWith(newValue);
      expect(testArea.imageContents).toEqual(newValue);
    });
    it('does not emit a posterImageContentsChange event if the isPlaying property does not change', () => {
      const existingValue = testAreaModel.imageContents;
      testArea.imageContents = existingValue;
      expect(mockListeners.posterImageContentsChange).not.toBeCalled();
    });
  });
  describe('Setting stars property', () => {
    it('updates the model and emits a posterStarChange event if the property changes', () => {
      const newValue = 2;
      testArea.stars = newValue;
      expect(mockListeners.posterStarChange).toBeCalledWith(newValue);
      expect(testArea.stars).toEqual(newValue);
    });
    it('does not emit a posterStarChange event if the isPlaying property does not change', () => {
      const existingValue = testAreaModel.stars;
      testArea.stars = existingValue;
      expect(mockListeners.posterStarChange).not.toBeCalled();
    });
  });
  describe('viewingAreaModel', () => {
    it('Carries through all of the properties', () => {
      const model = testArea.posterSessionAreaModel();
      expect(model).toEqual(testAreaModel);
    });
  });
});
