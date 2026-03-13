import { CodeExample } from "./code-example";

export const CreateTransactionDocumentation = () => {
  return (
    <div className="space-y-4">
      <p>
        You can create a transaction using the REST API. Here is an example of
        how to do it:
      </p>
      <CodeExample
        data={[
          {
            title: "REST API",
            languageName: "javascript",
            code: `POST ${process.env.NEXT_PUBLIC_URL}/api/transactions

Headers:
  Authorization: Bearer <API_KEY>
  Content-Type: application/json

Body:
{
  "amount": 1000,
  "return_url": "https://yourapp.com/return",
  "description": "Your description here",
  "metadata": {
    "orderId": "1234"
  }
} 
Return:
 {
    "id": "...",
    "confirmation_url": "${process.env.NEXT_PUBLIC_URL}/transaction/...",
    "status": "PENDING",
    "amount": 1000,
    "metadata": {
        "orderId": "1234"
    }
}`,
          },
          {
            title: "Node.js",
            languageName: "javascript",
            code: `async function createTransaction() {
  const res = await fetch("http://localhost:3000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer <API_KEY>"
    },
    body: JSON.stringify({
      amount: 1000,
      return_url: "https://yourapp.com/return",
      description: "Your description here",
      metadata: {
        orderId: "1234"
      }
    })
  });

  const data = await res.json();
  return data;
}

(async () => {
  const data = await createTransaction();
})();`,
          },
          {
            title: "Python",
            languageName: "python",
            code: `import requests

url = "${process.env.NEXT_PUBLIC_URL}/api/transactions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_KEY>"
}
payload = {
    "amount": 1000,
    "return_url": "https://yourapp.com/return",
    "description": "Your description here",
    "metadata": {
        "orderId": "1234"
    }
}

response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error {response.status_code}: {response.text}")`,
          },
          {
            title: "cURL",
            languageName: "curl",
            code: `curl -X POST ${process.env.NEXT_PUBLIC_URL}/api/transactions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <API_KEY>" \\
  -d '{
    "amount": 1000,
    "return_url": "https://yourapp.com/return",
    "description": "Your description here",
    "metadata": {
        "orderId": "1234"
    }
}'`,
          },
        ]}
      />
      Here is the list of headers:
      <ul className="space-y-4 list-disc">
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">amount</span> — An
          integer value that is used as the transaction amount.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">description</span>{" "}
          — A value used for description of the transaction.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">return_url</span>{" "}
          — A URL value used for redirecting user after successful payment.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">metadata</span> —
          This optional value is JSON format, mainly used for callbacks, for
          example change status of an order.
        </li>
      </ul>
      <p>Here is the list of response headers:</p>
      <ul className="space-y-4 list-disc mt-8">
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">id</span> — Payment ID.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">confirmation_url</span>{" "}
          — A URL value used for redirecting user after successful payment.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">return_url</span>{" "}
          — A URL value used for redirecting user after successful payment.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">status</span> —
          Status of the transaction, can be either PENDING or CONFIRMED.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">amount</span> — An
          integer value that is used as the transaction amount.
        </li>
        <li>
          <span className="p-2 rounded-sm bg-muted font-mono">metadata</span> —
          This optional value is JSON format, mainly used for callbacks, for
          example change status of an order.
        </li>
      </ul>
    </div>
  );
};
