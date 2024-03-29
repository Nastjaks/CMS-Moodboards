# CMS-Moodboards
1. [Idee](#idee)
2. [Features](#features)
3. [Toolstack](#toolstack)
4. [ERD](#erd)
5. [Erweiterungen](#features)
6. [Get started](#get-started)

## Idee
Ein Webdesigner möchte einen Blog zum Thema Webdesign führen, um anstrebenden Designern wertvolle Tipps geben zu können. 

Zusätzlich dazu soll eine ganze Plattform erstellt werden, die verwendet werden kann, um sich Inspirationen einzuholen und Ideen zu sammeln. 
Es soll eine Pinterest ähnliche Plattform entstehen, auf der Nutzer Bilder (Postings) hochladen und sehen können so wie Moodboards erstellen, in denen Postings gespeichert werden.

*Ein Moodboard ist eine “Pinnwand” von Bildern oder auch Texten, die eine bestimmte Stimmung einfangen und auf den Punkt bringen soll. Sie helfen Designern bei der Weiterentwicklung von Ideen und Konzepten.*

## Features

>### Nutzer
> Ein Nutzer kann sich registrieren und sich mit seinen Informationen auf der Plattform einloggen. (Nach der Registrierung wird der Nutzer automatisch eingeloggt)
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
> Ist der eingeloggte Nutzer der Ersteller des Moodboards, kann dieser das Moodboard auf der Detailseite bearbeiten, löschen und einzelne Postings vom Moodboard entfernen. 

>### Moodboard - Co-Creator
> Der Besitzer kann Co-Creator hinzufügen und entfernen.
> 
> Ist der Nutzer ein Co-Creator, erscheint im Profil ein weiterer Tab unterdem sie die Moodboards sehen können
> 
> Beim Hinzufügen wird geprüft, ob der Nutzer existiert oder bereits Co-Creator ist.
>
> Nutzer, die als Co Creator hinzugefügt wurden, können Postings zu dem jeweiligen Moodboard hinzufügen und entfernen.
>
> Zugeteilte Nutzer können das Moodboard als Co-Creator verlassen.

>### Academy - Blog
> Blogbeiträge für die Academy können nur über das CMS Backend in Strapi erstellt, bearbeitet und gelöscht werden.
>
> Auf der Academyseite sehen die Nutzer (auch nichteingeloggte) eine Übersicht aller Blogbeiträge. Über den Klick auf einen beliebigen Beitrag werden die Inhalte des Beitrags angezeigt.


## Toolstack
- Angular
- Angular-Material
- Strapi
- REST
- GitHub

## ERD
![ERD.png](ERD.png)
## Erweiterungen
Ideen für Erweiterungen:
- Infinite Scroll
- Mehr Filtermöglichkeiten
- Farbpaletten-Generator
- Speichern von Blogbeiträgen
- Ändern der Reihenfolge der Postings im Moodboard per drag and drop
- Socket.io  für das collaborative Arbeiten

## Get started

1. Projekt aus dem [Git-Repo](https://github.com/Nastjaks/CMS-Moodboards) clonen oder Projektordner aus einer alternativen Quelle beziehen


2. Für das Backend in [ `moodboards-backend/package.json`](moodboards-backend/package.json) alle Dependencies installieren
   - Strapi starten mit `start_strapi`
   - <a href="http://localhost:1337/admin/auth/login"> http://localhost:1337/admin/auth/login </a> zum öffnen (vorzugsweise mit Firefox)
   - Login mit -> Admin:`admin@cms.de` Passwort: `Admin_01`


3. Für das Frontend in [`moodboards-frontend/package.json`](moodboards-frontend/package.json) alle Dependencies installieren 
   -  Angular starten `start_angular`
   - <a href="http://localhost:4200/"> http://localhost:4200/ </a> zum öffnen (vorzugsweise mit Firefox)
   -  Neu registrieren oder Login mit -> Admin:`test_User_1` Passwort: `Test_1234`

