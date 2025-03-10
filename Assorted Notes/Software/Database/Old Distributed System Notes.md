# Distributed System

!!! Old notes: YugabyteDB ended up being overkill for this project
I chose couchdb instead. See CouchDB Intro.md for more info !!!

## Overview

Application use case
- Few users
- Distributed over multiple devices (raspberry pi or single board computer)
- Data needs to be shared
- Data will be stored on sd cards which fail at a higher rate than ssd, so need to be distributed for reliability
- Network latency is a concern - slow home networks


The goals I want to achieve with this database are:

- Reliability: data integrity, consistency, and availability on single device failure
- Performance: fast read and write speeds

## Architecture

## Likely Solution

### YugabyteDB with docker

yugabytedb in a docker container separate from the app container on each raspberry pi

yugabytedb is overkill switching to couchdb.

