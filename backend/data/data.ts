import { Database } from 'sqlite3';
import sqlite3 from 'sqlite3';

// helper function to promisify db.run
export function runAsync(db: Database, sql: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export const applicationsDb : Database = new sqlite3.Database('./data/applications.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the applications database.');
});

// database helper functions

export async function setupApplicationsDb(verbose : boolean = true) {
    let sql : string;

    // drop table if it already exists
    sql = `DROP TABLE IF EXISTS Applications`;
    await runAsync(applicationsDb, sql);
    console.log('Table dropped');

    // create table
    sql = `CREATE TABLE Applications (company, position, url, date_applied, status, term, location, notes)`
}

export function addApplication(application : any) {
    const sql = `INSERT INTO Applications (company, position, url, date_applied, status, term, location, notes) VALUES (?, ?, ?, ?, ?, ?)`;
    return runAsync(applicationsDb, sql, [application.company, application.position, application.url, application.date_applied, application.status, application.term, application.location, application.notes]);
}