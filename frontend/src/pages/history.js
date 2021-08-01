import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { useEffect, useState } from 'react';

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import "../style/style.css";

const columns = [
    {
        headerClassName: 'table-header',
        field: 'short_url',
        headerName: 'Short URL',
        width: 300,
        renderCell: (params) => (
              <a className="table-link" href={params.value} target="_blank" rel="noreferrer">
                {params.value}
              </a>
          ),
    },
    {
        headerClassName: 'table-header',
        field: 'creation_date',
        headerName: 'Created At',
        width: 200,
        valueGetter: (params) =>
        `
        ${moment(params.getValue(params.id)).format("dddd, MMMM Do YYYY")}
        `,
    },
    {

        headerClassName: 'table-header',
        field: 'long_url',
        headerName: 'Long URL',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <a className="table-link" href={params.value} target="_blank" rel="noreferrer">
              {params.value}
            </a>
        ),
    },
];

function History() {
    const [data, setData] = useState([]);
    const [retrieveDone, setRetrieveDone] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3500/get-all')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].id = nanoid(5);
                }
                setData(res.data);
                setRetrieveDone(true);
            })
    }, [])

    return (
        <>
            <div className="global-style">
                <Navbar />
                <div className="main">
                    <div style={{ height: 400, width: '80vw' }}>
                        {(retrieveDone) ?

                            <DataGrid
                                rows={data}
                                columns={columns}
                                pageSize={5}
                                disableMultipleSelection={true}

                            />
                            : null
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default History;