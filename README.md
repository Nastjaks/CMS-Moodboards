# CMS-Moodboards
1. [Idee](#idee)
2. [Features](#features)
3. [Erweiterungen](#features)
4. [Get started](#get-started)

## Idee
Ein Webdesigner möchte einen Blog zum Thema Webdesign führen, um anstrebenden Designern wertvolle Tipps geben zu können. 

Zusätzlich dazu soll eine ganze Plattform erstellt werden, die verwendet werden kann, um sich Inspirationen einzuholen und Ideen zu sammeln. 
Es soll eine Pinterest ähnliche Plattform entstehen, auf der Nutzer Bilder (Postings) hochladen und sehen können so wie Moodboards erstellen, in denen Postings gespeichert werden.

*Ein Moodboard ist eine “Pinnwand” von Bildern oder auch Texten, die eine bestimmte Stimmung einfangen und auf den Punkt bringen soll. Sie helfen Designern bei der Weiterentwicklung von Ideen und Konzepten.*

## Features

>### Nutzer
> Ein Nutzer kann sich registrieren und sich mit seinen Informationen auf der Plattform einloggen.
> 
> Auf der Profilseite kann der Nutzer seine Informationen bearbeiten, eine Beschreibung hinzufügen und sein Profil löschen. Beim Löschen werden die Nutzerinformationen gelöscht, so wie die erstellten Postings und Moodboards.

>### Postings
> Ein Posting kann von einem eingeloggten Nutzer auf der Profilseite erstellt werden.
>
> Auf der Profilseite können die eigenen Postings eingesehen werden.
>
> Über die Posting-Übersichtsseite sind Postings für alle Nutzer sichtbar, auch wenn diese nicht eingeloggt sind. Außerdem können auf der Übersichtsseite die Postings nach Kategorien sortieret werden.
>
> Über den Klick auf ein Posting kann sich ein Nutzer weitere Details zum Posting ansehen.
>
> Ein eingeloggter Nutzer kann über den Postingdialog das Posting einem eigenen bestehenden Moodboard hinzufügen.
>
> Ist der eingeloggte Nutzer der Ersteller des Postings, kann dieser das Posting im Postingdialog bearbeiten und löschen.

>### Moodboards
> Ein Moodboard kann von einem eingeloggten Nutzer auf der Profilseite erstellt werden.
>
> Auf der Profilseite können die eigenen Moodboards eingesehen werden.
>
> Über die Moodboard-Übersichtsseite sind alle Moodboards sichtbar, die nicht auf privat gestellt wurden und können auch von nichteingeloggten Nutzern gesehen werden.
>
> Über den Klick auf ein Moodboard kann sich ein Nutzer weitere Details zum Moodboard ansehen (wie Ersteller, Postings, Beschreibung...).
> 
> Ist der eingeloggte Nutzer der Ersteller des Moodboards, kann dieser das Moodboard auf der Deatilseite bearbeiten, löschen und einzelne Postings vom Moodboard entfernen.

>### Academy - Blog
> Blogbeiträge für die Academy können nur über das CMS Backend in Strapi erstellt, bearbeitet und gelöscht werden.
>
> Auf der Academyseite sehen die Nutzer (auch nichteingeloggte) eine Übersicht aller Blogbeiträge. Über den Klick auf einen beliebigen Beitrag werden die Inhalte des Beitrags angezeigt.

## Erweiterungen
Ideen für Erweiterungen:
- Infinite Scroll
- Mehr Filtermöglichkeiten
- Farbpaletten-Generator
- Speichern von Blogbeiträgen

## Get started

1. Projekt aus dem [Git-Repo](https://github.com/Nastjaks/CMS-Moodboards) clonen oder Projektordner aus einer alternativen Quelle beziehen


2. Für das Backend in [ `moodboards-backend/package.json`](moodboards-backend/package.json) alle Dependencies installieren
   - Strapi starten mit `develop`
   - Login mit -> Admin:`admin@cms.de` Passwort: `Admin_01`


3. Für das Frontend in [`moodboards-frontend/package.json`](moodboards-frontend/package.json) alle Dependencies installieren 
   -  Angular starten `start`
   -  Neu registrieren oder Login mit -> Admin:`test_User_1` Passwort: `Test_1234`