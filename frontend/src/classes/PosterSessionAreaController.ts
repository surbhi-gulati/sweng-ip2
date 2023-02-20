import { EventEmitter } from 'events';
import TypedEventEmitter from 'typed-emitter';
import { PosterSessionArea as PosterSessionAreaModel } from '../types/CoveyTownSocket';
import { useEffect, useState } from 'react';

/**
 * The events that a PosterSessionAreaController can emit
 */
export type PosterSessionAreaEvents = {
  /**
   * A posterTitleChange event indicates that the poster title has changed.
   * Listeners are passed the new state in new title.
   */
  posterTitleChange: (title: string | undefined) => void;
  /**
   * A posterTitleChange event indicates that the poster title has changed.
   * Listeners are passed the new state in new title.
   */
  posterImageContentsChange: (imageContents: string | undefined) => void;
  /**
   * A posterStarChange event indicates that the number of stars on the poster has changed.
   * Listeners are passed the new number of stars.
   */
  posterStarChange: (stars: number) => void;
};

/**
 * A PosterSessionAreaController manages the state for a PosterSessionArea in the frontend app, serving as a bridge between the poster
 * image that is being displayed in the user's browser and the backend TownService, and ensuring that star updates are
 * synchronized across all the players looking at the poster.
 *
 * The PosterSessionAreaController implements callbacks that handle events from the poster image in this browser window, and
 * emits updates when the state is updated, @see PosterSessionAreaEvents
 */
export default class PosterSessionAreaController extends (EventEmitter as new () => TypedEventEmitter<PosterSessionAreaEvents>) {
  private _model: PosterSessionAreaModel;

  // list of IDs of the players who have starred this poster session area, for a
  // particular poster image.
  private _playersWhoStarred: string[];

  /**
   * Constructs a new PosterSessionAreaController, initialized with the state of the
   * provided posterSessionAreaModel.
   *
   * @param posterSessionAreaModel The poster session area model that this controller should represent
   */
  constructor(posterSessionAreaModel: PosterSessionAreaModel) {
    super();
    // TODO
  }

  /**
   * The ID of the poster session area represented by this poster session area controller
   * This property is read-only: once a PosterSessionAreaController is created, it will always be
   * tied to the same poster session area ID.
   */
  public get id(): string {
    throw new Error('Unimplemented');
  }

  /**
   * The title of the poster assigned to this area, or undefined if there is not one.
   */
  public get title(): string | undefined {
    throw new Error('Unimplemented');
  }

  /**
   * The poster title: changing this value will emit a 'posterTitleChange' events to listeners
   *
   */
  public set title(title: string | undefined) {
    throw new Error('Unimplemented');
  }

  /**
   * The image of the poster assigned to this area, or undefined if there is not one.
   */
  public get imageContents(): string | undefined {
    throw new Error('Unimplemented');
  }

  /**
   * The image contents of the poster (string representing the contents of the poster file chosen).
   * Changing this value will emit a 'posterImageContentsChange' event to listeners, and empty the list
   * of players who starred the poster.
   */
  public set imageContents(imageContents: string | undefined) {
    throw new Error('Unimplemented');
  }

  /**
   * The number of stars of the poster assigned to this area.
   */
  public get stars(): number {
    throw new Error('Unimplemented');
  }

  /**
   * The number of stars of the poster assigned to this area.
   *
   * Changing this value will emit a ‘posterStarChange' event to listeners
   */
  public set stars(stars: number) {
    throw new Error('Unimplemented');
  }

  /**
   * The list of IDs of the players who starred the poster (with its current image)
   */
  public get playersWhoStarred(): string[] {
    throw new Error('Unimplemented');
  }

  /**
   * Add the specified player ID to the list of players who starred this poster.
   */
  public addPlayerWhoStarred(playerID: string) {
    throw new Error('Unimplemented');
  }

  /**
   * @returns PosterSessionAreaModel that represents the current state of this PosterSessionAreaController
   */
  public posterSessionAreaModel(): PosterSessionAreaModel {
    throw new Error('Unimplemented');
  }

  /**
   * Applies updates to this poster session area controller's model, setting the fields
   * image, stars, and title from the updatedModel
   *
   * @param updatedModel
   */
  public updateFrom(updatedModel: PosterSessionAreaModel): void {
    // note: this calls the setters; really we're updating the model
    this.title = updatedModel.title;
    this.imageContents = updatedModel.imageContents;
    this.stars = updatedModel.stars;
  }
}

/**
 * A hook that returns the number of stars for the poster session area with the given controller
 */
export function useStars(controller: PosterSessionAreaController): number {
  throw new Error('Unimplemented');
}

/**
 * A hook that returns the image contents for the poster session area with the given controller
 */
export function useImageContents(controller: PosterSessionAreaController): string | undefined {
  throw new Error('Unimplemented');
}

/**
 * A hook that returns the title for the poster session area with the given controller
 */
export function useTitle(controller: PosterSessionAreaController): string | undefined {
  throw new Error('Unimplemented');
}
