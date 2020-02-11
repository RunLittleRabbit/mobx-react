import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import {HEADER_TABLE, ROWS_PER_PAGE} from "../../constants";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    align: {
        textAlign: "center"
    }
});

export const ListOfProducts = inject("store")(observer(({store: { filteredPosts, loading, getPosts, getFilteredPosts}}) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);

    useEffect(() => {
        getPosts();
    },[getPosts]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return <>
        <div>
            <TextField
                onChange={getFilteredPosts}
                id="standard-basic"
                label="Search" />
        </div>
        {filteredPosts.length ? (
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {HEADER_TABLE.map(column => (
                                <TableCell
                                    key={column}
                                    className={classes.align}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(ROWS_PER_PAGE > 0
                                ? filteredPosts.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
                                : filteredPosts
                        ).map(el => (
                            <TableRow key={el.code}>
                                <TableCell
                                    className={classes.align}
                                    align="right">
                                    <img
                                        src={el.imageURLs[0]}
                                        alt="productImg"/>
                                </TableCell>
                                <TableCell
                                    className={classes.align}
                                    component="th"
                                    scope="row">
                                    <Link href={el.imageURLs[0]}>
                                        {el.productName}
                                    </Link>
                                </TableCell>
                                <TableCell
                                    className={classes.align}
                                    align="right">
                                    {el.price}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[ROWS_PER_PAGE]}
                                colSpan={3}
                                count={filteredPosts.length}
                                rowsPerPage={ROWS_PER_PAGE}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        ): (
            <div className="emptyPosts">We haven't this posts</div>
        )}

    </>
}));
