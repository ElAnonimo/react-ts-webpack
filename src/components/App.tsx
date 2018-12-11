import * as React from 'react';

// ... React.Component<props, state>
export class App extends React.Component<{}, IState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			currentTask: '',
			tasks: []
		};
	}

	public handleSubmit(evt: React.FormEvent<HTMLFormElement>):void {
		evt.preventDefault();

		this.setState({
			tasks: [
				...this.state.tasks,
				{
					id: this._timeInMilliseconds(),		// _ before private method name
					value: this.state.currentTask,
					completed: false
				}
			],
			currentTask: ''
		});
	}

	public handleChange(evt: React.FormEvent<HTMLInputElement>):void {
		this.setState({ currentTask: evt.currentTarget.value });
	}

	public handleDeleteClick(id: number):void {
		const filteredTasks: Array<ITask> = this.state.tasks.filter((task: ITask) => task.id !== id);
		this.setState({ tasks: filteredTasks });
	}

	public toggleDoneClick(id: number):void {
		const withCompletedTasks: ITask[] = this.state.tasks.map((task: ITask) => {
			if (task.id === id) {
				return {
					...task,
					completed: !task.completed
				};
			} else {
				return task;
			}
		});

		this.setState({ tasks: withCompletedTasks });
	}

	public renderTasks():JSX.Element[] {
		if (this.state.tasks.length) {
			return this.state.tasks.map((task: ITask) => (
				<div key={task.id} className='tdl-task'>
					<p className={task.completed ? 'is-completed': ''}>Task Name: {task.value}</p>
					<p className={task.completed ? 'is-completed': ''}>Completed: {task.completed ? 'Yes': 'No'}</p>
					<button onClick={() => this.handleDeleteClick(task.id)}>Delete</button>
					<button onClick={() => this.toggleDoneClick(task.id)}>{task.completed ? 'Undo' : 'Done'}</button>
				</div>
			));
		}
	}

	public render():JSX.Element {
		return (
			<div>
				<h1>Hello</h1>
				<form onSubmit={(evt) => this.handleSubmit(evt)}>
					<input
						type='text'
						className='tdl-input'
						placeholder='Add a Task'
						value={this.state.currentTask}
						onChange={(evt) => this.handleChange(evt)}
					/>
					<button type='submit'>Add Task</button>
				</form>
				<section>{this.renderTasks()}</section>
			</div>
		)
	}

	// private methods go below public ones
	private _timeInMilliseconds():number {
		const date: Date = new Date();
		return date.getTime();
	}
}

interface IState {
	currentTask: string;
	// tasks: Array<string>;
	tasks: Array<ITask>;
}

interface ITask {
	id: number,
	value: string,
	completed: boolean
}
