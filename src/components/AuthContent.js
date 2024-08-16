import * as React from 'react';
import {request} from '../apis/axios_helper';

export default class AuthContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : [] // Ensure the initial state is an array
        };
    };

    componentDidMount(){
        request(
            "GET",
            "/dummy",
            {}
        ).then((response) => {
            // Ensure the response is an array
            const responseData = Array.isArray(response.data) ? response.data : [];
            this.setState({ data: responseData });
        }).catch((error) => {
            console.error("Error fetching data", error);
            // Handle error by setting an empty array or appropriate fallback data
            this.setState({ data: [] });
        });
    };
    
    render(){
        return (
            <div>
                {this.state.data.length > 0 ? (
                    this.state.data.map((line, index) => (
                        <p key={index}>
                            {line}
                        </p>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        );
    }
}