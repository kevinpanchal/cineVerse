# CineVerse

**CineVerse is a user-friendly movie-booking website that provides a seamless platform for users to search,
book tickets, and organize their movie-related activities. With its easy-to-use layout and efficient operation,
CineVerse enhances the movie-booking experience. Users can explore various movies, check showTimes, and select
their preferred seats. Real-time seat availability updates enable informed ticket purchases. CineVerse aims to save
consumers' time and effort by delivering a user-friendly and efficient platform, ultimately creating an enjoyable movie
experience for all moviegoers.**

- _Date Created_: 24 05 2023
- _Last Modification Date_: 09 08 2023
- _Project URL_: <https://csci-5709-group-08.netlify.app>

## Authors

- [Himanshu Prajapati](himanshu@dal.ca) - _(Full-stack Developer)_
- [Kevin Panchal](panchal@dal.ca) - _(Full-stack Developer)_
- [Riya Patel](riya.patel@dal.ca) - _(Full-stack Developer)_
- [Roshil Patel](rs622844@dal.ca) - _(Full-stack Developer)_
- [Umang Mehta](umang@dal.ca) - _(Full-stack Developer)_
- [Vaidik Nimavat](vd386827@dal.ca) - _(Full-stack Developer)_

## Testing

To test the application for frontend, manual testing approach was used.
And for backend, all the endpoints were tested using Postman for all the HTTP methods. The application was tested for all the possible scenarios and it was found to be working as expected.

## Deployment

The Application has been deployed using GitLab for version control and GitHub as a mirrored repository, with [Netlify](https://www.netlify.com/) handling the frontend deployment process.

For backend, the application has been deployed using [Render](https://render.com). There may be some delay in loading the application for the first time, as the server may be in sleep mode.

## Credentials

### Admin

- email: admin@gmail.com
- password: admin@123

### User

- email: test.cineverse@gmail.com
- password: 12345678

## Built With

_Frontend_

- [ReactJs](https://react.dev) - The frontend framework used
- [Material UI](https://material-ui.com) - UI Library
- [React Router](https://reactrouter.com) - Routing Library
- [Redux](https://redux.js.org) - State Management Library
- [Redux Saga](https://redux-saga.js.org) - Side Effect Management Library
- [React Icons](https://react-icons.github.io/react-icons/) - Icons Library
- [React Tabs](https://reactcommunity.org/react-tabs/) - Tabs Library for React
- [Classnames](https://www.npmjs.com/package/classnames) - Utility Library for conditional classnames
- [ESlint](https://eslint.org) - Linting Library for JS and JSX
- [Prettier](https://prettier.io) - Code Formatter
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
- [React Table](https://www.npmjs.com/package/react-table) - Table Library for React
- [React Toastify](https://www.npmjs.com/package/react-toastify) - Toast Library for React
- [JS Cookie](https://www.npmjs.com/package/js-cookie) - Cookie Library for React

_Backend_

- [Node](https://nodejs.org/en/docs) - The backend framework used.
- [Express](https://expressjs.com) - The backend framework used.
- [MongoDB](https://www.mongodb.com/docs) - The database used.
- [Mongoose](https://mongoosejs.com/docs/guide.html) - The database framework used.
- [Stripe](https://stripe.com/docs/api) - The payment gateway used.
- [Nodemailer](https://nodemailer.com/about/) - The email service used.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - The password hashing library used.

## Sources Used

### src/components/Table/index.jsx

_Lines 71 - 141_

```
 <TableStyled {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow
                key={index}
                {...headerGroup.getHeaderGroupProps()}
                className="tableHeaderRow">
                {headerGroup.headers.map((column, i) => (
                  <TableHeaderCell
                    key={i}
                    {...column.getHeaderProps()}
                    className="tableHeaderCell">
                    {column.render("Header")}
                  </TableHeaderCell>
                ))}
                {!noAction && (
                  <TableHeaderCell>Action</TableHeaderCell>
                )}
              </TableRow>
            ))}
          </TableHead>
          {page.length > 0 ? (
            <TableBody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <TableBodyRow
                   key={index}
                   {...row.getRowProps()}
                   className="tableBodyRow">
                    {row.cells.map((cell, i) => (
                      <TableCell
                        key={i}
                        {...cell.getCellProps()}
                        className="tableBodyCell">
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                    {!noAction && (
                      <>
                        <TableCell>
                          <ActionButton
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                            handleUpdate(row.original)}>
                            Update
                          </ActionButton>
                          <ActionButton
                            variant="outlined"
                            color="error"
                            onClick={() =>
                            handleDelete(row.original)}>
                            Delete
                          </ActionButton>
                        </TableCell>
                      </>
                    )}
                  </TableBodyRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <Typography variant="body1" align="center">
                    No Data Found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </TableStyled>
```

The code above was created by adapting the code in [React Table](https://www.npmjs.com/package/react-table) as shown below:

```
<table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
```

- The code in [React Table](https://github.com/TanStack/table/blob/v7/examples/basic/src/App.js) was implemented by TanStack. It's not individual person's code rather its a open source library that anyone can use for their project. We have used this library to create table in our project. We have modified the code according to our requirements. We have added some extra features like pagination, search, sorting, etc. We have also added some extra styling to the table. We have also added some extra features like pagination, search,
- [React Table](https://github.com/TanStack/table/blob/v7/examples/basic/src/App.js)'s Code was used to create table in our project.

## Acknowledgments

- Used [Unsplash](https://unsplash.com) to get copyright free images.
- Referred [Article](https://dev.to/rajeshroyal/page-not-found-error-on-netlify-reactjs-react-router-solved-43oa) for solving the page not found error on netlify.
- Referred regex from [Stackoverflow](https://stackoverflow.com/questions/3617797/regex-to-match-only-letters), [Stackoverflow](https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters) and [Article](https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript) for validation.
