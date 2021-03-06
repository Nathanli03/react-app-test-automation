import { Ensure } from '@serenity-js/assertions';
import { Actor, actorCalled, actorInTheSpotlight, engage } from '@serenity-js/core';
import { Navigate, isVisible } from '@serenity-js/protractor';
import { Before, Given, Then, When } from 'cucumber';
import {
    Actors, EnterTodo
} from '../support/screenplay';
import { TodoPage } from '../support/screenplay/app/pageObjects';

Before(() => engage(new Actors()));

Given(/^(.*) is at the todo url page$/, (actorName: string) =>
    actorCalled(actorName).attemptsTo(
        Navigate.to('/'),
    ));

When(/(.*) enter (?:his|her|their) todo "(.*)"/, (actorName: string, todo: string) =>
actorInTheSpotlight().attemptsTo(
    EnterTodo.of(todo),
));

Then(/(?:he|she|they) is able to see the todo added$/, () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(TodoPage.deleteButton, isVisible()),
));

