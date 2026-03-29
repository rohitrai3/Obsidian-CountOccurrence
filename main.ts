import { Plugin } from "obsidian";

export default class HelloWorldPlugin extends Plugin {

	onload(): Promise<void> | void {

		this.registerMarkdownCodeBlockProcessor("countoccurrence", (source, el, ctx) => {
			this.processCode(source, el);
		});

	}

	private async processCode(source: string, el: Element) {
		el.empty();

		const rows = source.split("\n").filter(row => row.length > 0);
		const content = await this.app.vault.read(this.app.workspace.getActiveFile()!);
		const ul = el.createEl("ul");

		rows.forEach(row =>
			ul.createEl("li", { text: `${row}: ${content.match(new RegExp(row, "g"))?.length! - 1}` }));
	}

}

