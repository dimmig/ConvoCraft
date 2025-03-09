import json
from typing import Annotated
from typing_extensions import TypedDict
from dotenv import load_dotenv
from langgraph.graph import START, END, StateGraph
from langgraph.graph.message import add_messages
from langchain_groq import ChatGroq
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import ToolMessage
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver

load_dotenv()

search_tool = TavilySearchResults(max_results=2)
memory = MemorySaver()
llm = ChatGroq(model="qwen-2.5-32b")

llm_with_tools = llm.bind_tools([search_tool])

class State(TypedDict):
    messages: Annotated[list, add_messages]


graph_builder = StateGraph(State)


def chatbot(state: State):
    response = llm_with_tools.invoke(state["messages"])

    if response.tool_calls:
        tool_call = response.tool_calls[0]
        tool_name = tool_call["name"]
        tool_input = tool_call["args"]

        tool_result = search_tool.invoke(tool_input)

        tool_message = ToolMessage(
            tool_call_id=tool_call["id"],
            name=tool_name,
            content=json.dumps(tool_result),
        )

        state["messages"].append(tool_message)

        response = llm_with_tools.invoke(state["messages"])

    return {"messages": [response]}


graph_builder.add_node("chatbot", chatbot)

tool_node = ToolNode(tools=[search_tool])
graph_builder.add_node("tools", tool_node)

graph_builder.add_conditional_edges("chatbot", tools_condition)
graph_builder.add_edge("tools", "chatbot")
graph_builder.set_entry_point("chatbot")

graph = graph_builder.compile(checkpointer=memory)