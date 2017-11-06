import * as React from 'react';
import { Header } from '../shared/Header';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stepIndex: 0
        }
    }

    render() {
        const {
            stepIndex
        } = this.state;

        const handleNext = stepIndex == 2
            ? () => alert('Finished!')
            : () => this.setState({ stepIndex: stepIndex + 1 });

        return (
            <div>
                <Header {...this.props} />
                <Paper zDepth={3}>
                    <Subheader>Регистрация нового студента</Subheader>
                    <Divider />
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Почта</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Основные данные</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Фотография</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={{ marginTop: 12 }}>
                        <p>{this.getStepContent(stepIndex)}</p>
                        <FlatButton
                            label="Back"
                            disabled={stepIndex === 0}
                            onClick={() => this.setState({ stepIndex: stepIndex - 1 })}
                            style={{ marginRight: 12 }}
                        />
                        <RaisedButton
                            label={stepIndex === 2 ? 'Finish' : 'Next'}
                            primary={true}
                            onClick={handleNext}
                        />
                    </div>
                </Paper>
            </div>
        );
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Select campaign settings...';
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
}