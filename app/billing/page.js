import Image from "next/image";
import Link from "next/link";

export default function Billing() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="JedMantra Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <button className="ml-4 relative flex-shrink-0 p-1 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="ml-4 relative flex items-center">
                <Image
                  src="https://via.placeholder.com/32x32"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="ml-2 text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Current Plan */}
            <section aria-labelledby="current-plan-heading">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2
                    id="current-plan-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Current Plan
                  </h2>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        You are currently on the
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        Professional Plan
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        £49.99/month • Renews on Dec 1, 2024
                      </p>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Subscription Plans */}
            <section aria-labelledby="plans-heading">
              <h2
                id="plans-heading"
                className="text-lg font-medium text-gray-900"
              >
                Available Plans
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Basic",
                    price: "£29.99",
                    features: [
                      "10 job postings",
                      "Basic analytics",
                      "Email support",
                      "Access to candidate database",
                    ],
                  },
                  {
                    name: "Professional",
                    price: "£49.99",
                    features: [
                      "Unlimited job postings",
                      "Advanced analytics",
                      "Priority support",
                      "Featured listings",
                      "Custom branding",
                    ],
                    current: true,
                  },
                  {
                    name: "Enterprise",
                    price: "£99.99",
                    features: [
                      "Everything in Professional",
                      "API access",
                      "Dedicated account manager",
                      "Custom integration",
                      "Bulk posting tools",
                    ],
                  },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`bg-white shadow rounded-lg divide-y divide-gray-200 ${
                      plan.current ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {plan.name}
                      </h3>
                      <p className="mt-4">
                        <span className="text-3xl font-extrabold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /month
                        </span>
                      </p>
                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="ml-3 text-sm text-gray-700">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                          plan.current
                            ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                            : "text-white bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {plan.current ? "Current Plan" : "Select Plan"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Payment Methods */}
            <section aria-labelledby="payment-methods-heading">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2
                    id="payment-methods-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Payment Methods
                  </h2>
                  <div className="mt-4 space-y-4">
                    {[
                      {
                        type: "Visa",
                        last4: "4242",
                        expiry: "12/24",
                        default: true,
                      },
                      {
                        type: "Mastercard",
                        last4: "5555",
                        expiry: "08/25",
                        default: false,
                      },
                    ].map((card) => (
                      <div
                        key={card.last4}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Image
                            src={`https://via.placeholder.com/32x20?text=${card.type}`}
                            alt={card.type}
                            width={32}
                            height={20}
                            className="rounded"
                          />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {card.type} ending in {card.last4}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {card.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {card.default && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            Edit
                          </button>
                          <button className="text-sm text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <svg
                        className="h-5 w-5 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Payment Method
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Billing History */}
            <section aria-labelledby="billing-history-heading">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2
                    id="billing-history-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Billing History
                  </h2>
                  <div className="mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {
                            date: "Nov 1, 2023",
                            description: "Professional Plan Subscription",
                            amount: "£49.99",
                            status: "Paid",
                          },
                          {
                            date: "Oct 1, 2023",
                            description: "Professional Plan Subscription",
                            amount: "£49.99",
                            status: "Paid",
                          },
                        ].map((invoice, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {invoice.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {invoice.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {invoice.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {invoice.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <button className="text-blue-600 hover:text-blue-700">
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
