import json

from src.model import graph
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

config = {"configurable": {"thread_id": "1"}}
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def stream_graph_updates(user_input: str):
    events = graph.stream(
        {"messages": [{"role": "user", "content": user_input}]},
        config,
        stream_mode="values",
    )
    for event in events:
        print(event["messages"])
        yield json.dumps({"message": event["messages"][-1].content}) + '\n'


@app.get("/generate")
async def generate(user_input: str):
    return StreamingResponse(stream_graph_updates(user_input), media_type="text/event-stream")