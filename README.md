# CMS-Moodboards
1. [Idee](#idee)
2. [Features](#features)
3. [Erweiterungen](#features)
4. [Get started](#get-started)

## Idee
Ein Webdesigner möchte einen Blog zum Thema Webdesign führen, um anstrebenden Designer wertvolle Tipps geben zu können. 

Zusätzlich dazu soll eine ganze Plattform erstellt werden, die verendet werden kann, um sich Inspirationen einzuholen und Ideen zu sammeln. 
Es soll eine Pintrest ähnliche Plattform entstehen, auf der Nutzer Bilder (Postings) hochladen können und sehen können so wie Moodboards erstellen, indenen Postings gespeichert weden können.

*Ein Moodboard ist eine “Pinnwand” von Bildern oder auch Texten, die eine bestimmte Stimmung einfangen und auf den Punkt bringen soll. Sie Helfen Designern bei der Weiterentwicklung von Ideen und Konzepten.*

## Features

>### Nutzer
> Ein Nutzer kann sich registrieren und sich mit seinen Informationen auf der Plattform einloggen.
> 
> Auf der Profilseite kann der Nutzer seine Informationen bearbeiten, eine Beschreibung hinzufügen und sein Profil löschen. Beim Löschen werden die Nutzer Informationen gelöscht, so wie die erstellten Postings und Moodboards.

>### Postings
> Ein Posting kann von einem eingeloggten Nutzer auf der Profilseite erstellt werden.
>
> Auf der Profilseite können die eigenen Postings eigesehen werden.
>
> Über die Posting-Übersichtsseite sind Postings für alle Nutzer sichtbar, auch wenn diese nicht eingeloggt sind. Außerdem können auf der Übersichtsseite die Postings nach Kategorien sortieret werden.
>
> Über den Klick auf ein Posting kann ein Nutzer sich weitere Details zum Posting ansehen.
>
> Ein eingeloggter Nutzer kann über den Postingdialog das Posting einem bestehenden Moodboard hinzufügen.
>
> Ist der eingeloggt Nutzer der ersteller des Postings, kann dieser das Posting im Postingdialog bearbeiten und löschen.

>### Moodboards
> Ein Moodboard kann von einen Eingeloggten Nutzer auf der Profilseite erstellt werden.
>
> Auf der Profilseite können die eigenen Moodboards eigesehen werden.
>
> Über die Moodboard-Übersichtsseite sind alle Moodboards sichtbar, die nicht auf privat gestellt wurden und können auch von nichteingelpggten Nutzern gesehen werden.
>
> Über den Klick auf ein Moodboard kann ein Nutzer sich weitere Details zum Moodboard ansehen (wie Ersteller, Postings Beschreibung...).
> 
> Ist der eingeloggt Nutzer der ersteller des Moodboards, kann dieser das Moodboard auf der Deatilseite bearbeiten, löschen und einzelne Postings vom Moodboard entfernen.

>### Academy - Blog
> Blogbeiträge für die Academy können nur über das CMS Backend in Strapi erstellt/bearbeitet/gelöscht werden.
>
> Auf der Über die Academyseite sind die Nutzer (auf ohne Konto) eine Übersicht aller Blogbeiträge ansehen. Über den Klick auf einen beliebigen Beitrag erden die Inhalte des Beitrags angezeigt.

## Erweiterungen
Ideen für Erweiterungen:
- Infinit Scroll
- Mehr Filter Möglichkeiten
- Farbpaletten generator
- Speichern von Blogbeiträgen

## Get started

1. Projekt aus dem [Git-Repo](https://github.com/Nastjaks/CMS-Moodboards) clonen oder Projektordner aus einer alternativen Quelle beziehen


2. Für das Backend in [ `moodboards-backend/package.json`](moodboards-backend/package.json) alle Dependencies instalieren
   - Strapi starten mit `develop`
   - Login -> Admin:`admin@cms.de` Passwort: `Admin_01`


3. Für das Frontend in [`moodboards-frontend/package.json`](moodboards-frontend/package.json) alle Dependencies instalieren 
   -  Angular starten `start`
   -  Neu registrieren oder Login -> Admin:`test_User_1` Passwort: `Test_1234`